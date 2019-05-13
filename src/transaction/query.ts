import joinMonster from 'join-monster';
import { knex } from '@app/knex';
import { QueryResolvers } from '@app/types/graphql';

export const Query: QueryResolvers = {
  transactions(_, __, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  transaction(_, __, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
