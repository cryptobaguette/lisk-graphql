const SqlString = require('sqlstring');
import { fromRawLsk } from '../helpers/lisk';
const { limitFromArgs, offsetFromArgs } = require('../helpers/monster');

export const monster = {
  Query: {
    fields: {
      accounts: {
        orderBy: args => {
          if (args.sort === 'BALANCE_DESC') {
            return { balance: 'desc' };
          }
          if (args.sort === 'BALANCE_ASC') {
            return { balance: 'asc' };
          }
          throw new Error('Invalid orderBy params');
        },
        limit: limitFromArgs,
        offset: offsetFromArgs,
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
          throw new Error('Invalid where params');
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
      name: {
        sqlColumn: 'username',
      },
      unconfirmedBalance: {
        sqlColumn: 'u_balance',
      },
      balance: {
        sqlColumn: 'balance',
        resolve: row => fromRawLsk(row.balance),
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
