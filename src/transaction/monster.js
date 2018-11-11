const SqlString = require('sqlstring');

const { limitFromArgs, offsetFromArgs } = require('../helpers/monster');
import { epochTime } from '../lisk/helpers/constants';
import { fromRawLsk } from '../helpers/lisk';

exports.monster = {
  Query: {
    fields: {
      transactions: {
        orderBy: {
          t_rowId: 'desc',
        },
        limit: limitFromArgs,
        offset: offsetFromArgs,
        // TODO args order by enum
        // TODO other args filters
      },
      transaction: {
        where: (table, args) => `${table}.t_id = ${SqlString.escape(args.id)}`,
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
        resolve: row =>
          new Date(row.timestamp * 1000 + epochTime.getTime()).getTime(),
      },
      senderId: {
        sqlColumn: 't_senderId',
      },
      recipientId: {
        sqlColumn: 't_recipientId',
      },
      amount: {
        sqlColumn: 't_amount',
        resolve: row => fromRawLsk(row.amount),
      },
      fee: {
        sqlColumn: 't_fee',
      },
      block: {
        sqlJoin: (transactionTable, accountTable) =>
          `${transactionTable}."t_blockId" = ${accountTable}."b_id"`,
      },
      sender: {
        sqlJoin: (transactionTable, accountTable) =>
          `${transactionTable}."t_senderId" = ${accountTable}."address"`,
      },
      recipient: {
        sqlJoin: (transactionTable, accountTable) =>
          `${transactionTable}."t_recipientId" = ${accountTable}."address"`,
      },
    },
  },
};
