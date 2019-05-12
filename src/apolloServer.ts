import { GraphQLError } from 'graphql';
import { ForbiddenError, ApolloError } from 'apollo-server';
import { config } from './config';

/**
 * Protect the server with a token
 */
export const context = (req: any) => {
  if (config.authToken) {
    const token = req.headers.authorization || '';
    if (token !== config.authToken) {
      throw new ForbiddenError('Invalid token');
    }
  }

  return {};
};

/**
 * The goal of this middleware is to only return whitelisted errors
 * This way we won't leak database or other internal errors
 */
export const formatError = (error: GraphQLError) => {
  const originalError = error.originalError;
  if (originalError instanceof ApolloError) {
    return error;
  }
  console.error(error);
  throw new Error('Internal server error');
};
