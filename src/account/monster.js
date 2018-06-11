const SqlString = require('sqlstring');

const { limitFromArgs, offsetFromArgs } = require('../helpers/monster');

exports.monster = {
  Query: {
    fields: {
      accounts: {
        orderBy: { balance: 'asc' },
        limit: limitFromArgs,
        offset: offsetFromArgs,
        // TODO args order by enum
        // TODO other args filters
      },
      account: {
        where: (table, args) => {
          if (args.address) {
            return `${table}."address" = ${SqlString.escape(args.address)}`;
          }
          if (args.publicKey) {
            return `${table}."publicKey" = DECODE(${SqlString.escape(
              args.publicKey
            )}, 'hex')`;
          }
          throw new Error('Invalid params');
        },
      },
    },
  },
  Account: {
    sqlTable: 'mem_accounts',
    uniqueKey: 'publicKey',
    fields: {
      address: {
        sqlColumn: 'address',
      },
      unconfirmedBalance: {
        sqlColumn: 'u_balance',
      },
      balance: {
        sqlColumn: 'balance',
      },
      publicKey: {
        sqlColumn: 'publicKey',
        sqlExpr: table => `ENCODE(${table}."publicKey", 'hex')`,
      },
      secondPublicKey: {
        sqlColumn: 'secondPublicKey',
      },
    },
  },
};
