require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';

const port = process.env.PORT || 3000;

const server = new ApolloServer({ schema });

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
