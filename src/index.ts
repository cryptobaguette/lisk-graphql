require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';
import { config } from './config';

const server = new ApolloServer({ schema });

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
