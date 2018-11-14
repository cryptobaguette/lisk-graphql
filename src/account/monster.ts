import * as SqlString from 'sqlstring';
import { fromRawLsk } from '@app/helpers/lisk';
import { limitFromArgs, offsetFromArgs } from '@app/helpers/monster';
import { AccountQueryArgs, AccountsQueryArgs } from '@app/types/graphql';

export const monster = {
  Query: {
    fields: {
      accounts: {
        orderBy: (args: AccountsQueryArgs) => {
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
        where: (table: string, args: AccountQueryArgs) => {
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
        resolve: (row: any) => fromRawLsk(row.balance),
      },
      publicKey: {
        sqlColumn: 'publicKey',
        sqlExpr: (table: string) => `ENCODE(${table}."publicKey", 'hex')`,
      },
      secondPublicKey: {
        sqlColumn: 'secondPublicKey',
      },
    },
  },
};
