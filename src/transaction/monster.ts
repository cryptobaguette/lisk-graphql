import SqlString from 'sqlstring';
import constants from '@liskhq/lisk-constants';
import { fromRawLsk } from '@app/helpers/lisk';
import { limitFromArgs, offsetFromArgs } from '@app/helpers/monster';
import {
  TransactionQueryArgs,
  TransactionsQueryArgs,
} from '@app/types/graphql';

export const monster = {
  Query: {
    fields: {
      transactions: {
        orderBy: (args: TransactionsQueryArgs) => {
          if (args.sort === 'AMOUNT_DESC') {
            return { amount: 'desc', rowId: 'desc' };
          }
          if (args.sort === 'AMOUNT_ASC') {
            return { amount: 'asc', rowId: 'desc' };
          }
          return { rowId: 'desc' };
        },
        limit: limitFromArgs,
        offset: offsetFromArgs,
        // TODO args order by enum
        // TODO other args filters
      },
      transaction: {
        where: (table: string, args: TransactionQueryArgs) =>
          `${table}.id = ${SqlString.escape(args.id)}`,
      },
    },
  },
  Transaction: {
    sqlTable: 'trs',
    uniqueKey: 'id',
    fields: {
      id: {
        sqlColumn: 'id',
      },
      blockId: {
        sqlColumn: 'blockId',
      },
      type: {
        sqlColumn: 'type',
      },
      timestamp: {
        sqlColumn: 'timestamp',
        resolve: (row: any) =>
          new Date(
            row.timestamp * 1000 + constants.EPOCH_TIME.getTime()
          ).getTime(),
      },
      senderId: {
        sqlColumn: 'senderId',
      },
      recipientId: {
        sqlColumn: 'recipientId',
      },
      amount: {
        sqlColumn: 'amount',
        resolve: (row: any) => fromRawLsk(row.amount),
      },
      fee: {
        sqlColumn: 'fee',
      },
      block: {
        sqlJoin: (transactionTable: string, accountTable: string) =>
          `${transactionTable}."blockId" = ${accountTable}."b_id"`,
      },
      sender: {
        sqlJoin: (transactionTable: string, accountTable: string) =>
          `${transactionTable}."senderId" = ${accountTable}."address"`,
      },
      recipient: {
        sqlJoin: (transactionTable: string, accountTable: string) =>
          `${transactionTable}."recipientId" = ${accountTable}."address"`,
      },
    },
  },
};
