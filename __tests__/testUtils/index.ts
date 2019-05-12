import { APIClient } from '@liskhq/lisk-api-client';
import got from 'got';

export const liskNetwork = (process.env.LISK_NETWORK || 'testnet') as
  | 'mainnet'
  | 'testnet';

export const liskClient = new APIClient([
  `http://${process.env.LISK_HOST || 'localhost'}:${
    liskNetwork === 'mainnet' ? 8000 : 7000
  }`,
]);

const graphqlUrl = 'http://localhost:3000/graphql';

export const makeGraphqlRequest = ({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}) =>
  got
    .post(graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables, operationName: null }),
    })
    .then(data => data.body)
    .then(data => JSON.parse(data)) as Promise<{ data: any; errors: any }>;
