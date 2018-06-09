// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/account.js

const joinMonster = require('join-monster').default;

const { knex } = require('../knex');

exports.typeDef = `
  type Account {
    # Address of account.
    address: String!

    # Unconfirmed balance of account.
    unconfirmedBalance: String! # TODO BigInt

    # Balance of account.
    balance: String! # TODO BigInt

    # Public key of account.
    publicKey: String!

    # If account enabled second signature, but it's still not confirmed.
    unconfirmedSignature: Boolean!

    # If account enabled second signature.
    secondSignature: Boolean!
  }

  extend type Query {
    # Returns account information of an address.
    account(
      # Address of account.
      address: String!
    ): Account
  }
`;

// TODO multisignatures
// TODO u_multisignatures

exports.monster = {
  Query: {
    fields: {
      account: {
        // TODO allow find by publicKey
        where: (table, args) => `${table}.address = '${args.address}'`,
      },
    },
  },
  Account: {
    sqlTable: 'mem_accounts',
    uniqueKey: 'publicKey',
    fields: {
      address: {
        sqlColumn: 'address',
      },
      unconfirmedBalance: {
        sqlColumn: 'u_balance',
      },
      balance: {
        sqlColumn: 'balance',
      },
      publicKey: {
        sqlColumn: 'publicKey',
      },
      unconfirmedSignature: {
        sqlColumn: 'u_secondSignature',
      },
      secondSignature: {
        sqlColumn: 'secondSignature',
      },
    },
  },
};

exports.Query = {
  account(parent, args, ctx, resolveInfo) {
    if (!args.address && !args.publicKey) {
      throw new Error('Missing required property: address or publicKey');
    }
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};

exports.resolver = {
  Account: {
    publicKey: account => account.publicKey.toString('hex'),
  },
};
