import { ApolloError } from 'apollo-server';
import SqlString from 'sqlstring';
import { limitFromArgs, offsetFromArgs } from '@app/helpers/monster';
import { QueryBlockArgs, QueryBlocksArgs } from '@app/types/graphql';

export const monster = {
  Query: {
    fields: {
      blocks: {
        orderBy: (args: QueryBlocksArgs) => {
          if (args.sort === 'HEIGHT_ASC') {
            return { height: 'asc' };
          }
          if (args.sort === 'HEIGHT_DESC') {
            return { height: 'desc' };
          }
          if (args.sort === 'TOTAL_AMOUNT_ASC') {
            return { totalAmount: 'asc' };
          }
          if (args.sort === 'TOTAL_AMOUNT_DESC') {
            return { totalAmount: 'desc' };
          }
          throw new ApolloError('Invalid orderBy params');
        },
        limit: limitFromArgs,
        offset: offsetFromArgs,
        // TODO other args filters
      },
      block: {
        where: (table: string, args: QueryBlockArgs) =>
          `${table}.id = ${SqlString.escape(args.id)}`,
      },
    },
  },
  Block: {
    sqlTable: 'blocks',
    uniqueKey: 'id',
    fields: {
      id: {
        sqlColumn: 'id',
      },
      version: {
        sqlColumn: 'version',
      },
      timestamp: {
        sqlColumn: 'timestamp',
      },
      height: {
        sqlColumn: 'height',
      },
      previousBlockId: {
        sqlColumn: 'previousBlock',
      },
      numberOfTransactions: {
        sqlColumn: 'numberOfTransactions',
      },
      totalAmount: {
        sqlColumn: 'totalAmount',
      },
      totalFee: {
        sqlColumn: 'totalFee',
      },
      reward: {
        sqlColumn: 'reward',
      },
      totalForged: {
        sqlDeps: ['totalFee', 'reward'],
      },
      payloadLength: {
        sqlColumn: 'payloadLength',
      },
      payloadHash: {
        sqlColumn: 'payloadHash',
        sqlExpr: (table: string) => `ENCODE(${table}."payloadHash", 'hex')`,
      },
      generatorPublicKey: {
        sqlColumn: 'generatorPublicKey',
        sqlExpr: (table: string) =>
          `ENCODE(${table}."generatorPublicKey", 'hex')`,
      },
      blockSignature: {
        sqlColumn: 'blockSignature',
        sqlExpr: (table: string) => `ENCODE(${table}."blockSignature", 'hex')`,
      },
      confirmations: {
        sqlExpr: (table: string) =>
          `( SELECT max("b"."height") + 1 FROM "blocks" AS "b" ) - ${table}."height"`,
      },
    },
  },
};
