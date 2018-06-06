// see https://github.com/LiskHQ/lisk/blob/0.9.15/logic/block.js

const bignum = require('../helpers/bignum.js');
const getAddressByPublicKey = require('../helpers/getAddressByPublicKey');

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
`;

exports.monster = {
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
};

exports.resolver = {
  generatorId: block => getAddressByPublicKey(block.generatorPublicKey),
  totalForged: block =>
    new bignum(block.totalFee).plus(new bignum(block.reward)),
};
