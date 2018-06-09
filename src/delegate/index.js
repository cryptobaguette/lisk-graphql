// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/delegate.js

const joinMonster = require('join-monster').default;

const { knex } = require('../knex');
const { limitFromArgs } = require('../helpers/monster');
const slots = require('../helpers/slots');

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
      username: {
        sqlColumn: 'username',
      },
      unconfirmedBalance: {
        sqlColumn: 'u_balance',
      },
      balance: {
        sqlColumn: 'balance',
      },
      publicKey: {
        sqlColumn: 'publicKey',
      },
      vote: {
        sqlColumn: 'vote',
      },
      unconfirmedSignature: {
        sqlColumn: 'u_secondSignature',
      },
      secondSignature: {
        sqlColumn: 'secondSignature',
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
    }).then(delegates => {
      i = 1;
      delegates.forEach(delegate => {
        delegate.rank = i;
        i++;
      });
      return delegates;
    });
  },
};

exports.resolver = {
  Delegate: {
    publicKey: account => account.publicKey.toString('hex'),
    // https://github.com/LiskHQ/lisk/blob/0.9.15/modules/delegates.js#L478
    productivity: delegate => {
      let percent =
        100 -
        delegate.missedblocks /
          ((delegate.producedblocks + delegate.missedblocks) / 100);
      percent = Math.abs(percent) || 0;
      const outsider = delegate.rank + 1 > slots.delegates;
      return !outsider ? Math.round(percent * 1e2) / 1e2 : 0;
    },
    rank: delegate => delegate.rank,
  },
};
