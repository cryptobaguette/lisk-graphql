import { ApolloError } from 'apollo-server';
import SqlString from 'sqlstring';
import { fromRawLsk } from '@app/helpers/lisk';
import { limitFromArgs, offsetFromArgs } from '@app/helpers/monster';
import { QueryAccountArgs, QueryAccountsArgs } from '@app/types/graphql';

export const monster = {
  Query: {
    fields: {
      accounts: {
        orderBy: (args: QueryAccountsArgs) => {
          if (args.sort === 'BALANCE_DESC') {
            return { balance: 'desc' };
          }
          if (args.sort === 'BALANCE_ASC') {
            return { balance: 'asc' };
          }
          throw new ApolloError('Invalid orderBy params');
        },
        limit: limitFromArgs,
        offset: offsetFromArgs,
      },
      account: {
        where: (table: string, args: QueryAccountArgs) => {
          if (args.address) {
            return `${table}."address" = ${SqlString.escape(args.address)}`;
          }
          if (args.publicKey) {
            return `${table}."publicKey" = DECODE(${SqlString.escape(
              args.publicKey
            )}, 'hex')`;
          }
          if (args.secondPublicKey) {
            return `${table}."secondPublicKey" = DECODE(${SqlString.escape(
              args.secondPublicKey
            )}, 'hex')`;
          }
          throw new ApolloError('Invalid where params');
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
