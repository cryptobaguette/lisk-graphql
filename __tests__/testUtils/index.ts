import * as lisk from 'lisk-elements';
import { GraphQLClient } from 'graphql-request';

export const liskClient = new lisk.APIClient(['http://localhost:8000']);

export const graphqlClient = new GraphQLClient('http://localhost:3000/graphql');
