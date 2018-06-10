const { limitFromArgs, offsetFromArgs } = require('../helpers/monster');

exports.monster = {
  Query: {
    fields: {
      blocks: {
        orderBy: { b_height: 'desc' },
        limit: limitFromArgs,
        offset: offsetFromArgs,
        // TODO args order by enum
        // TODO other args filters
      },
      block: {
        where: (table, args) => `${table}.b_id = '${args.id}'`,
      },
    },
  },
  Block: {
    sqlTable: 'blocks_list',
    uniqueKey: 'b_id',
    fields: {
      id: {
        sqlColumn: 'b_id',
      },
      version: {
        sqlColumn: 'b_version',
      },
      timestamp: {
        sqlColumn: 'b_timestamp',
      },
      height: {
        sqlColumn: 'b_height',
      },
      previousBlockId: {
        sqlColumn: 'b_previousBlock',
      },
      numberOfTransactions: {
        sqlColumn: 'b_numberOfTransactions',
      },
      totalAmount: {
        sqlColumn: 'b_totalAmount',
      },
      totalFee: {
        sqlColumn: 'b_totalFee',
      },
      reward: {
        sqlColumn: 'b_reward',
      },
      payloadLength: {
        sqlColumn: 'b_payloadLength',
      },
      payloadHash: {
        sqlColumn: 'b_payloadHash',
      },
      generatorPublicKey: {
        sqlColumn: 'b_generatorPublicKey',
      },
      blockSignature: {
        sqlColumn: 'b_blockSignature',
      },
      confirmations: {
        sqlColumn: 'b_confirmations',
      },
    },
  },
};
