import lisk from 'lisk-elements';
import isCi from 'is-ci';
import { GraphQLClient } from 'graphql-request';

// Tests are running on testnet
export const liskClient = isCi
  ? lisk.APIClient.createTestnetAPIClient()
  : new lisk.APIClient(['http://localhost:8000']);

export const graphqlClient = new GraphQLClient('http://localhost:3000/graphql');
