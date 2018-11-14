import joinMonster from 'join-monster';
import { knex } from '@app/knex';
import { QueryResolvers } from '@app/types/graphql';

export const Query: QueryResolvers.Resolvers = {
  transactions(_, __, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  block(_, __, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
