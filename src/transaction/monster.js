const { limitFromArgs } = require('../helpers/monster');

exports.monster = {
  Query: {
    fields: {
      transactions: {
        orderBy: { b_height: 'desc' },
        limit: limitFromArgs,
        // TODO args offset
        // TODO args order by enum
        // TODO other args filters
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
        // TODO raw.b_id || raw.t_blockId
        sqlColumn: 't_blockId',
      },
      type: {
        sqlColumn: 't_type',
      },
      timestamp: {
        sqlColumn: 't_timestamp',
      },
      // senderPublicKey: {
      //   sqlColumn: 't_senderPublicKey',
      // },
      // requesterPublicKey: {
      //   sqlColumn: 't_requesterPublicKey',
      // },
      senderId: {
        sqlColumn: 't_senderId',
      },
      recipientId: {
        sqlColumn: 't_recipientId',
      },
      // recipientPublicKey: {
      //   sqlColumn: 'm_recipientPublicKey',
      // },
      amount: {
        sqlColumn: 't_amount',
      },
      fee: {
        sqlColumn: 't_fee',
      },
    },
  },
};
