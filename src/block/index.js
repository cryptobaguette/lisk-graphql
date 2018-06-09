// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/block.js

const joinMonster = require('join-monster').default;

const Bignum = require('../helpers/bignum');
const getAddressByPublicKey = require('../helpers/getAddressByPublicKey');
const { knex } = require('../knex');
const { limitFromArgs } = require('../helpers/monster');

exports.typeDef = `
  type Block {
    # Unique identifier of the block. Derived from the block signature.
    id: ID!

    # Versioning for future upgrades of the lisk protocol.
    version: Int

    # Height of the network, when the block got forged. The height of the networks represents the number of blocks, that have been forged on the network since Genesis Block.
    height: Int!

    timestamp: Int!

    # Lisk Address of the delegate who forged the block.
    generatorAddress: String

    # Public key of th edelagte who forged the block.
    generatorPublicKey: String!

    # Bytesize of the payload hash.
    payloadLength: Int

    # Hash of the payload of the block. The payload of a block is comprised of the transactions the block contains. For each type of transaction exists a different maximum size for the payload.
    payloadHash: String

    # Derived from a SHA-256 hash of the block header, that is signed by the private key of the delegate who forged the block.
    blockSignature: String

    # Number of times that this Block has been confirmed by the network. By forging a new block on a chain, all former blocks in the chain get confirmed by the forging delegate.
    confirmations: Int

    # The id of the previous block of the chain.
    previousBlockId: String

    # The number of transactions processed in the block.
    numberOfTransactions: Int!

    # The total amount of Lisk transferred.
    totalAmount: Int!

    # The total amount of fees associated with the block.
    totalFee: Int!

    # The Lisk reward for the delegate.
    reward: Int!

    # Total amount of LSK that have been forged in this Block. Consists of fees and the reward.
    totalForged: String! # TODO BigInt

    generatorId: String!
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
  }
`;

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
