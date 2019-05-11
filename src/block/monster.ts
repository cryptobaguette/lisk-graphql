import SqlString from 'sqlstring';
import { limitFromArgs, offsetFromArgs } from '@app/helpers/monster';
import { BlockQueryArgs } from '@app/types/graphql';

export const monster = {
  Query: {
    fields: {
      blocks: {
        orderBy: { height: 'desc' },
        limit: limitFromArgs,
        offset: offsetFromArgs,
        // TODO args order by enum
        // TODO other args filters
      },
      block: {
        where: (table: string, args: BlockQueryArgs) =>
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
          `( SELECT max("b"."height") + 1 FROM ${table} AS "b" ) - ${table}."height"`,
      },
    },
  },
};
