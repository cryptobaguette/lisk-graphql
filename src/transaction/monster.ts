import * as SqlString from 'sqlstring';
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
            return { t_amount: 'desc', t_rowId: 'desc' };
          }
          if (args.sort === 'AMOUNT_ASC') {
            return { t_amount: 'asc', t_rowId: 'desc' };
          }
          return { t_rowId: 'desc' };
        },
        limit: limitFromArgs,
        offset: offsetFromArgs,
        // TODO args order by enum
        // TODO other args filters
      },
      transaction: {
        where: (table: string, args: TransactionQueryArgs) =>
          `${table}.t_id = ${SqlString.escape(args.id)}`,
      },
    },
  },
  Transaction: {
    sqlTable: 'trs_list',
    uniqueKey: 't_id',
    fields: {
      id: {
        sqlColumn: 't_id',
      },
      height: {
        sqlColumn: 'b_height',
      },
      blockId: {
        sqlColumn: 't_blockId',
      },
      type: {
        sqlColumn: 't_type',
      },
      timestamp: {
        sqlColumn: 't_timestamp',
        resolve: (row: any) =>
          new Date(
            row.timestamp * 1000 + constants.EPOCH_TIME.getTime()
          ).getTime(),
      },
      senderId: {
        sqlColumn: 't_senderId',
      },
      recipientId: {
        sqlColumn: 't_recipientId',
      },
      confirmations: {
        sqlColumn: 'confirmations',
      },
      amount: {
        sqlColumn: 't_amount',
        resolve: (row: any) => fromRawLsk(row.amount),
      },
      fee: {
        sqlColumn: 't_fee',
      },
      block: {
        sqlJoin: (transactionTable: string, accountTable: string) =>
          `${transactionTable}."t_blockId" = ${accountTable}."b_id"`,
      },
      sender: {
        sqlJoin: (transactionTable: string, accountTable: string) =>
          `${transactionTable}."t_senderId" = ${accountTable}."address"`,
      },
      recipient: {
        sqlJoin: (transactionTable: string, accountTable: string) =>
          `${transactionTable}."t_recipientId" = ${accountTable}."address"`,
      },
    },
  },
};
