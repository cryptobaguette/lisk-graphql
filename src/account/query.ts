import joinMonster from 'join-monster';
import { knex } from '@app/knex';
import { QueryResolvers } from '@app/types/graphql';
import { isPublicKeyValid } from '@app/helpers/validators';

export const Query: QueryResolvers = {
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
    if (args.publicKey && !isPublicKeyValid(args.publicKey)) {
      throw new Error('Invalid public key');
    }
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
