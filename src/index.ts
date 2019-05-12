import { ApolloServer, ForbiddenError, ApolloError } from 'apollo-server';
import { schema } from './graphql';
import { config } from './config';

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    /**
     * Protext the server with a token
     */
    if (config.authToken) {
      const token = req.headers.authorization || '';
      if (token !== config.authToken) {
        throw new ForbiddenError('Invalid token');
      }
    }

    return {};
  },
  /**
   * The goal of this middleware is to only return whitelisted errors
   * This way we won't leak database or other internal errors
   */
  formatError: error => {
    const originalError = error.originalError;
    if (originalError instanceof ApolloError) {
      return error;
    }
    console.error(error);
    throw new Error('Internal server error');
  },
});

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
