const { makeExecutableSchema } = require('graphql-tools');
const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');
const { merge } = require('lodash');

const { GraphQLBigInt } = require('./helpers/graphqlBigInt');

const {
  typeDef: AccountTypeDef,
  monster: AccountMonster,
  Query: AccountQuery,
  resolver: AccountResolver,
} = require('./account');
const {
  typeDef: BlockTypeDef,
  monster: BlockMonster,
  Query: BlockQuery,
  resolver: BlockResolver,
} = require('./block');
const {
  typeDef: DelegateTypeDef,
  monster: DelegateMonster,
  Query: DelegateQuery,
  resolver: DelegateResolver,
} = require('./delegate');
const {
  typeDef: TransactionTypeDef,
  monster: TransactionMonster,
  Query: TransactionQuery,
  resolver: TransactionResolver,
} = require('./transaction');

const typeDefs = `
  scalar BigInt
  
  type Query {
    _: String
  }
`;

const resolvers = {
  Query: merge(AccountQuery, BlockQuery, DelegateQuery, TransactionQuery),
};

const schema = makeExecutableSchema({
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

exports.schema = schema;

joinMonsterAdapt(
  schema,
  merge(AccountMonster, BlockMonster, DelegateMonster, TransactionMonster)
);
