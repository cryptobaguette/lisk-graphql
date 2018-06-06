// see https://github.com/LiskHQ/lisk/blob/0.9.15/logic/block.js

const joinMonster = require('join-monster').default;

const Bignum = require('../helpers/bignum');
const getAddressByPublicKey = require('../helpers/getAddressByPublicKey');
const constants = require('../helpers/constants');
const { knex } = require('../knex');

exports.typeDef = `
  type Block {
    id: ID!
    version: Int!
    timestamp: Int!
    height: Int!
    previousBlock: String
    numberOfTransactions: Int!
    totalAmount: Int!
    totalFee: Int!
    reward: Int!
    payloadLength: Int!
    payloadHash: String!
    generatorPublicKey: String!
    generatorId: String!
    blockSignature: String!
    confirmations: Int!
    totalForged: Int!
  }

  type Fees {
    send: Int!
    vote: Int!
    secondsignature: Int!
    delegate: String!
    multisignature: Int!
    dapp: String!
  }

  extend type Query {
    # Gets all blocks by provided filter(s).
    blocks(
      # Limit of blocks to add to response. Default to 100.
      limit: Int
    ): [Block!]!

    # Gets block by provided id.
    block(
      # Id of block.
      id: ID!
    ): Block

    # Get transaction fee for sending "normal" transactions.
    getFee: Int!

    # Get transaction fee for all types of transactions.
    getFees: Fees!
  }
`;

exports.monster = {
  Query: {
    fields: {
      blocks: {
        orderBy: { b_height: 'desc' },
        limit: args => {
          if (args.limit <= 0) {
            throw new Error('Invalid limit. Must be positive');
          }
          if (args.limit > 100) {
            throw new Error('Invalid limit. Maximum is 100');
          }
          return args.limit || 100;
        },
        // TODO args offset
        // TODO args order by
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
      previousBlock: {
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
  getFee() {
    return constants.fees.send;
  },
  getFees() {
    return constants.fees;
  },
};

exports.resolver = {
  Block: {
    generatorId: block => getAddressByPublicKey(block.generatorPublicKey),
    totalForged: block =>
      new Bignum(block.totalFee).plus(new Bignum(block.reward)),
  },
};
