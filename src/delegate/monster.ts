import * as SqlString from 'sqlstring';
import { limitFromArgs, offsetFromArgs } from '@app/helpers/monster';
import { DelegateQueryArgs } from '@app/types/graphql';
import { monster as AccountMonster } from '../account';

export const monster = {
  Query: {
    fields: {
      delegates: {
        where: (table: string) => `${table}."isDelegate" = 1`,
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
        where: (table: string, args: DelegateQueryArgs) => {
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
            (followerTable: string, junctionTable: string) =>
              `ENCODE(${followerTable}."publicKey", 'hex') = ${junctionTable}."dependentId"`,
            // then the junction to the child
            (junctionTable: string, followeeTable: string) =>
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
            (followerTable: string, junctionTable: string) =>
              `${followerTable}."address" = ${junctionTable}."accountId"`,
            // then the junction to the child
            (junctionTable: string, followeeTable: string) =>
              `${junctionTable}."dependentId" = ENCODE(${followeeTable}."publicKey", 'hex')`,
          ],
        },
      },
    },
  },
};
