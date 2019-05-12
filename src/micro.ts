import { ApolloServer } from 'apollo-server-micro';
import { schema } from './graphql';
import { context, formatError } from './apolloServer';

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context,
  formatError,
});

module.exports = server.createHandler();
