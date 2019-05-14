import SqlString from 'sqlstring';
import { EPOCH_TIME } from '@liskhq/lisk-constants';
import { fromRawLsk } from '@app/helpers/lisk';
import { limitFromArgs, offsetFromArgs } from '@app/helpers/monster';
import {
  QueryTransactionArgs,
  QueryTransactionsArgs,
} from '@app/types/graphql';

export const monster = {
  Query: {
    fields: {
      transactions: {
        orderBy: (args: QueryTransactionsArgs) => {
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
        where: (table: string, args: QueryTransactionArgs) =>
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
          new Date(row.timestamp * 1000 + EPOCH_TIME.getTime()).getTime(),
      },
      timestampRaw: {
        sqlDeps: ['timestamp'],
      },
      signature: {
        sqlColumn: 'signature',
        sqlExpr: (table: string) => `ENCODE(${table}."signature", 'hex')`,
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
      amountRaw: {
        sqlDeps: ['amount'],
      },
      fee: {
        sqlColumn: 'fee',
      },
      block: {
        sqlJoin: (transactionTable: string, blockTable: string) =>
          `${transactionTable}."blockId" = ${blockTable}."id"`,
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
