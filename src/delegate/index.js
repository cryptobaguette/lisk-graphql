// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/delegate.js

const joinMonster = require('join-monster').default;

const { knex } = require('../knex');
const { limitFromArgs } = require('../helpers/monster');
const Bignum = require('../helpers/bignum');

const {
  monster: AccountMonster,
  resolver: AccountResolver,
} = require('../account');

// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/account.js#L418
const calculateProductivity = (producedBlocks, missedBlocks) => {
  const producedBlocksBignum = new Bignum(producedBlocks || 0);
  const missedBlocksBignum = new Bignum(missedBlocks || 0);
  const percent = producedBlocksBignum
    .dividedBy(producedBlocksBignum.plus(missedBlocksBignum))
    .times(100)
    .round(2);
  return !percent.isNaN() ? percent.toNumber() : 0;
};

exports.typeDef = `
  type Delegate {
    # The delegates’ username. A delegate chooses the username by registering a delegate on the Lisk network. It is unique and cannot be changed later.
    username: String!

    # The voters weight of the delegate. Represents the total amount of Lisk (in Beddows) that the delegates’ voters own. The voters weight decides which rank the delegate gets in relation to the other delegates and their voters weights.
    vote: String! # TODO BigInt

    # Total sum of block rewards that the delegate has forged.
    rewards: String

    # Total number of blocks the delegate has forged.
    producedBlocks: Int

    # Total number of blocks the delegate has missed.
    missedBlocks: Int

    # Percentage of the voters weight, that the delegate owns in relation to the total supply of Lisk.
    approval: Int

    # Productivity rate. Percentage of successfully forged blocks (not missed) by the delegate.
    productivity: Float

    # ---- Copy paste from accounts schema ----

    # The Lisk Address is the human readable representation of the accounts owners’ public key. It consists of 21 numbers followed by a big ‘L’ at the end.
    address: String!

    # The public key is derived from the private key of the owner of the account. It can be used to validate that the private key belongs to the owner, but does not provide access to the owners private key.
    publicKey: String!

    # The current balance of the account in Beddows.
    balance: String! # TODO BigInt

    # The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions.
    unconfirmedBalance: String! # TODO BigInt

    # If account enabled second signature, but it's still not confirmed.
    unconfirmedSignature: Boolean!

    # The second public key is derived from the second private key of an account, if the owner activated a second passphrase for her/his account.
    secondPublicKey: Boolean!

    # ---- End copy paste ----
  }

  extend type Query {
    # Gets list of delegates by provided filter.
    delegates(
      # Limit of delegates to add to response. Default to 100.
      limit: Int
    ): [Delegate!]!
  }
`;

// TODO rank
// TODO approval

exports.monster = {
  Query: {
    fields: {
      delegates: {
        where: table => `${table}."isDelegate" = 1`,
        orderBy: {
          vote: 'desc',
          publicKey: 'asc',
        },
        limit: limitFromArgs,
        // TODO args offset
        // TODO args order by enum
        // TODO other args filters
      },
      // TODO delegate query
    },
  },
  Delegate: {
    sqlTable: 'mem_accounts',
    uniqueKey: 'publicKey',
    fields: {
      ...AccountMonster.Account.fields,
      username: {
        sqlColumn: 'username',
      },
      vote: {
        sqlColumn: 'vote',
      },
      producedBlocks: {
        sqlColumn: 'producedblocks',
      },
      missedBlocks: {
        sqlColumn: 'missedblocks',
      },
      productivity: {
        sqlDeps: ['producedblocks', 'missedblocks'],
      },
    },
  },
};

exports.Query = {
  delegates(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};

exports.resolver = {
  Delegate: {
    ...AccountResolver.Account,
    publicKey: account => account.publicKey.toString('hex'),
    productivity: delegate =>
      calculateProductivity(delegate.producedBlocks, delegate.missedBlocks),
  },
};
