const { typeDef } = require('./typeDef');

exports.typeDef = typeDef;

const { Query } = require('./query');

exports.Query = Query;

const { resolver } = require('./resolver');

exports.resolver = resolver;

// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/account.js

const { limitFromArgs } = require('../helpers/monster');

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
        sqlExpr: table => `ENCODE(${table}."publicKey", 'hex')`,
      },
      secondPublicKey: {
        sqlColumn: 'secondPublicKey',
      },
    },
  },
};
