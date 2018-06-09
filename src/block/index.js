const { typeDef } = require('./typeDef');

exports.typeDef = typeDef;

// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/block.js

const joinMonster = require('join-monster').default;

const Bignum = require('../lisk/helpers/bignum');
const getAddressByPublicKey = require('../helpers/getAddressByPublicKey');
const { knex } = require('../knex');
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

exports.Query = {
  blocks(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  block(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};

exports.resolver = {
  Block: {
    generatorId: block => getAddressByPublicKey(block.generatorPublicKey),
    totalForged: block =>
      new Bignum(block.totalFee).plus(new Bignum(block.reward)),
  },
};
