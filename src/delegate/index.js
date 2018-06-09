// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/delegate.js

const joinMonster = require('join-monster').default;

const { knex } = require('../knex');
const { limitFromArgs } = require('../helpers/monster');
const Bignum = require('../helpers/bignum');
const constants = require('../helpers/constants');

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

// TODO implement this function as a graphql loader
// used in votesUsed && votesAvailable resolvers
const getVotersCountForDelegates = async delegate => {
  // See https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/db/sql/votes/get_votes_count.sql
  const res = await knex('mem_accounts2delegates')
    .where({ accountId: delegate.address })
    .count('*');
  const { count } = res[0];
  return count;
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

    # Returns all votes received by a delegate.
    voters: [Account!]!

    # Returns all votes placed by an account.
    votes: [Account!]!

    # Number of votes that are already placed by the queried account.
    votesUsed: Int!

    # Number of votes that are available for the queried account. Derives from 101(max possible votes) - votesUsed(already used votes)
    votesAvailable: Int!

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

    # Returns account information of a delegate.
    delegate(
      # Address of delegate.
      address: String!
    ): Delegate
  }
`;

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
      delegate: {
        // TODO allow find by publicKey
        // TODO allow find by secondPublicKey
        where: (table, args) => `${table}.address = '${args.address}'`,
      },
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
        sqlColumn: 'producedBlocks',
      },
      missedBlocks: {
        sqlColumn: 'missedBlocks',
      },
      productivity: {
        sqlDeps: ['producedBlocks', 'missedBlocks'],
      },
      voters: {
        orderBy: {
          vote: 'desc',
          publicKey: 'asc',
        },
        junction: {
          sqlTable: 'mem_accounts2delegates',
          sqlJoins: [
            // first the parent table to the junction
            (followerTable, junctionTable) =>
              `ENCODE(${followerTable}."publicKey", 'hex') = ${junctionTable}."dependentId"`,
            // then the junction to the child
            (junctionTable, followeeTable) =>
              `${junctionTable}."accountId" = ${followeeTable}."address"`,
          ],
        },
      },
      votes: {
        orderBy: {
          vote: 'desc',
          publicKey: 'asc',
        },
        junction: {
          sqlTable: 'mem_accounts2delegates',
          sqlJoins: [
            // first the parent table to the junction
            (followerTable, junctionTable) =>
              `${followerTable}."address" = ${junctionTable}."accountId"`,
            // then the junction to the child
            (junctionTable, followeeTable) =>
              `${junctionTable}."dependentId" = ENCODE(${followeeTable}."publicKey", 'hex')`,
          ],
        },
      },
    },
  },
};

exports.Query = {
  delegates(parent, args, ctx, resolveInfo) {
    return joinMonster(
      resolveInfo,
      ctx,
      sql => console.log(sql) || knex.raw(sql),
      {
        dialect: 'pg',
      }
    );
  },
  delegate(parent, args, ctx, resolveInfo) {
    if (!args.address && !args.publicKey) {
      throw new Error('Missing required property: address or publicKey');
    }
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};

exports.resolver = {
  Delegate: {
    ...AccountResolver.Account,
    productivity: delegate =>
      calculateProductivity(delegate.producedBlocks, delegate.missedBlocks),
    votesUsed: getVotersCountForDelegates,
    votesAvailable: async delegate => {
      const votesCount = await getVotersCountForDelegates(delegate);
      return constants.maxVotesPerAccount - votesCount;
    },
  },
};
