import { ApolloError } from 'apollo-server';
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
    if (!args.address && !args.publicKey && !args.secondPublicKey) {
      throw new ApolloError(
        'Missing required property: address, publicKey or secondPublicKey'
      );
    }
    if (args.publicKey && !isPublicKeyValid(args.publicKey)) {
      throw new ApolloError('Invalid public key');
    }
    if (args.secondPublicKey && !isPublicKeyValid(args.secondPublicKey)) {
      throw new ApolloError('Invalid second public key');
    }
    return joinMonster(resolveInfo, ctx, (sql: string) => knex.raw(sql), {
      dialect: 'pg',
    });
  },
};
