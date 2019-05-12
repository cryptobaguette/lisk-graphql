import { ApolloError } from 'apollo-server';
import joinMonster from 'join-monster';
import { knex } from '@app/knex';
import { QueryResolvers } from '@app/types/graphql';

export const Query: QueryResolvers = {
  delegates(_, __, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  delegate(_, args, ctx, resolveInfo) {
    if (!args.username && !args.address && !args.publicKey) {
      throw new ApolloError(
        'Missing required property: username, address or publicKey'
      );
    }
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
