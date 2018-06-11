const SqlString = require('sqlstring');

const { limitFromArgs, offsetFromArgs } = require('../helpers/monster');
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
        offset: offsetFromArgs,
        // TODO args order by enum
        // TODO other args filters
      },
      delegate: {
        where: (table, args) => {
          if (args.username) {
            return `${table}."username" = ${SqlString.escape(args.username)}`;
          }
          if (args.address) {
            return `${table}."address" = ${SqlString.escape(args.address)}`;
          }
          if (args.publicKey) {
            return `${table}."publicKey" = DECODE(${SqlString.escape(
              args.publicKey
            )}, 'hex')`;
          }
          throw new Error('Invalid params');
        },
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
