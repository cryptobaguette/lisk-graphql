const { typeDef } = require('./typeDef');

exports.typeDef = typeDef;

// https://github.com/LiskHQ/lisk/blob/0.9.15/logic/delegate.js

const joinMonster = require('join-monster').default;

const { knex } = require('../knex');
const { limitFromArgs } = require('../helpers/monster');
const Bignum = require('../lisk/helpers/bignum');
const constants = require('../lisk/helpers/constants');

const {
  monster: AccountMonster,
  resolver: AccountResolver,
} = require('../account');

// https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/logic/account.js#L418
const calculateProductivity = (producedBlocks, missedBlocks) => {
  const producedBlocksBignum = new Bignum(producedBlocks || 0);
  const missedBlocksBignum = new Bignum(missedBlocks || 0);
  const percent = producedBlocksBignum
    .dividedBy(producedBlocksBignum.plus(missedBlocksBignum))
    .times(100)
    .round(2);
  return !percent.isNaN() ? percent.toNumber() : 0;
};

// TODO implement this function as a graphql loader
// used in votesUsed && votesAvailable resolvers
const getVotersCountForDelegates = async delegate => {
  // See https://github.com/LiskHQ/lisk/blob/v1.0.0-beta.7/db/sql/votes/get_votes_count.sql
  const res = await knex('mem_accounts2delegates')
    .where({ accountId: delegate.address })
    .count('*');
  const { count } = res[0];
  return count;
};

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

exports.resolver = {
  Delegate: {
    ...AccountResolver.Account,
    productivity: delegate =>
      calculateProductivity(delegate.producedBlocks, delegate.missedBlocks),
    votesUsed: getVotersCountForDelegates,
    votesAvailable: async delegate => {
      const votesCount = await getVotersCountForDelegates(delegate);
      return constants.maxVotesPerAccount - votesCount;
    },
  },
};
