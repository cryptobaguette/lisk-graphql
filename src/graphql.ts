import { makeExecutableSchema } from 'graphql-tools';
import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import { merge } from 'lodash';
import { GraphQLBigInt } from './helpers/graphqlBigInt';

import {
  typeDef as AccountTypeDef,
  monster as AccountMonster,
  Query as AccountQuery,
  resolver as AccountResolver,
} from './account';
import {
  typeDef as BlockTypeDef,
  monster as BlockMonster,
  Query as BlockQuery,
  resolver as BlockResolver,
} from './block';
import {
  typeDef as DelegateTypeDef,
  monster as DelegateMonster,
  Query as DelegateQuery,
  resolver as DelegateResolver,
} from './delegate';
import {
  typeDef as TransactionTypeDef,
  monster as TransactionMonster,
  Query as TransactionQuery,
  resolver as TransactionResolver,
} from './transaction';

const typeDefs = `
  scalar BigInt
  
  type Query {
    _: String
  }
`;

const resolvers = {
  Query: merge(AccountQuery, BlockQuery, DelegateQuery, TransactionQuery),
};

export const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    AccountTypeDef,
    BlockTypeDef,
    DelegateTypeDef,
    TransactionTypeDef,
  ],
  resolvers: merge(
    resolvers,
    AccountResolver,
    BlockResolver,
    DelegateResolver,
    TransactionResolver,
    {
      BigInt: GraphQLBigInt,
    }
  ),
});

joinMonsterAdapt(
  schema,
  merge(AccountMonster, BlockMonster, DelegateMonster, TransactionMonster)
);
