import { APIClient } from '@liskhq/lisk-api-client';
import { GraphQLClient } from 'graphql-request';

export const liskNetwork = (process.env.LISK_NETWORK || 'testnet') as
  | 'mainnet'
  | 'testnet';

export const liskClient = new APIClient([
  `http://${process.env.LISK_HOST || 'localhost'}:${
    liskNetwork === 'mainnet' ? 8000 : 7000
  }`,
]);

export const graphqlClient = new GraphQLClient('http://localhost:3000/graphql');
