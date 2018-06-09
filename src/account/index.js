// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/account.js

const joinMonster = require('join-monster').default;

const { knex } = require('../knex');
const { limitFromArgs } = require('../helpers/monster');

exports.typeDef = `
  type Account {
    # The Lisk Address is the human readable representation of the accounts owners’ public key. It consists of 21 numbers followed by a big ‘L’ at the end.
    address: String!

    # The public key is derived from the private key of the owner of the account. It can be used to validate that the private key belongs to the owner, but does not provide access to the owners private key.
    publicKey: String!

    # The current balance of the account in Beddows.
    balance: String! # TODO BigInt

    # The current unconfirmed balance of the account in Beddows. Includes unconfirmed transactions.
    unconfirmedBalance: String! # TODO BigInt

    # If account enabled second signature, but it's still not confirmed.
    unconfirmedSignature: Boolean!

    # The second public key is derived from the second private key of an account, if the owner activated a second passphrase for her/his account.
    secondPublicKey: Boolean!
  }

  extend type Query {
    # Gets all accounts by provided filter(s).
    accounts(
      # Limit of accounts to add to response. Default to 100.
      limit: Int
    ): [Account!]!

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
      accounts: {
        orderBy: { balance: 'asc' },
        limit: limitFromArgs,
        // TODO args offset
        // TODO args order by enum
        // TODO other args filters
      },
      account: {
        // TODO allow find by publicKey
        // TODO allow find by secondPublicKey
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
      secondPublicKey: {
        sqlColumn: 'secondPublicKey',
      },
    },
  },
};

exports.Query = {
  accounts(parent, args, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
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
