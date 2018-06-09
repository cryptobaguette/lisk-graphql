const { typeDef } = require('./typeDef');

exports.typeDef = typeDef;

const { Query } = require('./query');

exports.Query = Query;

const { resolver } = require('./resolver');

exports.resolver = resolver;

// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/block.js

const { limitFromArgs } = require('../helpers/monster');

exports.monster = {
  Query: {
    fields: {
      blocks: {
        orderBy: { b_height: 'desc' },
        limit: limitFromArgs,
        // TODO args offset
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
