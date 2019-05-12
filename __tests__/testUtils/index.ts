import { APIClient } from '@liskhq/lisk-api-client';
import isCi from 'is-ci';
import { GraphQLClient } from 'graphql-request';

// Tests are running on testnet
export const liskClient = isCi
  ? APIClient.createTestnetAPIClient()
  : new APIClient(['http://localhost:8000']);

export const graphqlClient = new GraphQLClient('http://localhost:3000/graphql');
