import { ApolloServer, ForbiddenError } from 'apollo-server';
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
});

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
