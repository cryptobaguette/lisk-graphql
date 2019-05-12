import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';
import { config } from './config';
import { context, formatError } from './apolloServer';

const server = new ApolloServer({
  schema,
  context,
  formatError,
});

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
