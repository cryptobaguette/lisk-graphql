import joinMonster from 'join-monster';
import { knex } from '@app/knex';
import { QueryResolvers } from '@app/types/graphql';

export const Query: QueryResolvers.Resolvers = {
  accounts(_, __, ctx, resolveInfo) {
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
  account(_, args, ctx, resolveInfo) {
    // TODO allow find one by secondPublicKey
    if (!args.address && !args.publicKey) {
      throw new Error('Missing required property: address or publicKey');
    }
    // Validate publicKey format
    if (args.publicKey) {
      if (args.publicKey.length !== 64) {
        throw new Error('Invalid public key, must be 64 characters long');
      }
      // TODO verify hex formating
    }
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
