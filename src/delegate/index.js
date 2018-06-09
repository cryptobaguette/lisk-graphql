const { typeDef } = require('./typeDef');

exports.typeDef = typeDef;

const { resolver } = require('./resolver');

exports.resolver = resolver;

// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/delegate.js

const joinMonster = require('join-monster').default;

const { knex } = require('../knex');
const { limitFromArgs } = require('../helpers/monster');

const { monster: AccountMonster } = require('../account');

exports.monster = {
  Query: {
    fields: {
      delegates: {
        where: table => `${table}."isDelegate" = 1`,
        orderBy: {
          vote: 'desc',
          publicKey: 'asc',
        },
        limit: limitFromArgs,
        // TODO args offset
        // TODO args order by enum
        // TODO other args filters
      },
      delegate: {
        // TODO allow find by publicKey
        // TODO allow find by secondPublicKey
        where: (table, args) => `${table}.address = '${args.address}'`,
      },
    },
  },
  Delegate: {
    sqlTable: 'mem_accounts',
    uniqueKey: 'publicKey',
    fields: {
      ...AccountMonster.Account.fields,
      username: {
        sqlColumn: 'username',
      },
      vote: {
        sqlColumn: 'vote',
      },
      producedBlocks: {
        sqlColumn: 'producedBlocks',
      },
      missedBlocks: {
        sqlColumn: 'missedBlocks',
      },
      productivity: {
        sqlDeps: ['producedBlocks', 'missedBlocks'],
      },
      voters: {
        orderBy: {
          vote: 'desc',
          publicKey: 'asc',
        },
        junction: {
          sqlTable: 'mem_accounts2delegates',
          sqlJoins: [
            // first the parent table to the junction
            (followerTable, junctionTable) =>
              `ENCODE(${followerTable}."publicKey", 'hex') = ${junctionTable}."dependentId"`,
            // then the junction to the child
            (junctionTable, followeeTable) =>
              `${junctionTable}."accountId" = ${followeeTable}."address"`,
          ],
        },
      },
      votes: {
        orderBy: {
          vote: 'desc',
          publicKey: 'asc',
        },
        junction: {
          sqlTable: 'mem_accounts2delegates',
          sqlJoins: [
            // first the parent table to the junction
            (followerTable, junctionTable) =>
              `${followerTable}."address" = ${junctionTable}."accountId"`,
            // then the junction to the child
            (junctionTable, followeeTable) =>
              `${junctionTable}."dependentId" = ENCODE(${followeeTable}."publicKey", 'hex')`,
          ],
        },
      },
    },
  },
};

exports.Query = {
  delegates(parent, args, ctx, resolveInfo) {
    return joinMonster(
      resolveInfo,
      ctx,
      sql => console.log(sql) || knex.raw(sql),
      {
        dialect: 'pg',
      }
    );
  },
  delegate(parent, args, ctx, resolveInfo) {
    if (!args.address && !args.publicKey) {
      throw new Error('Missing required property: address or publicKey');
    }
    return joinMonster(resolveInfo, ctx, sql => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
