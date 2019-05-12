import { ApolloError } from 'apollo-server';

// see if https://github.com/joonhocho/graphql-input-number can be a good idea for that

export const limitFromArgs = (args: { limit?: number }) => {
  if (args.limit && args.limit <= 0) {
    throw new ApolloError('Invalid limit. Must be positive.');
  }
  if (args.limit && args.limit > 100) {
    throw new ApolloError('Invalid limit. Maximum is 100.');
  }
  return args.limit || 10;
};

export const offsetFromArgs = (args: { offset?: number }) => {
  if (args.offset && args.offset < 0) {
    throw new ApolloError('Invalid offset. Must be positive.');
  }
  return args.offset || 0;
};
