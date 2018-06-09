const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');
const { merge } = require('lodash');

try {
  // eslint-disable-next-line
  require('../config.json');
} catch (error) {
  console.error(`
config.json file not found.
Please copy config.example.json as config.json and edit it.
  `);
  process.exit(-1);
}

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

// TODO sanityse sql queries inputs

const typeDefs = `
  type Query {
    _: String
  }
`;

const resolvers = {
  Query: merge(AccountQuery, BlockQuery, DelegateQuery),
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, AccountTypeDef, BlockTypeDef, DelegateTypeDef],
  resolvers: merge(resolvers, AccountResolver, BlockResolver, DelegateResolver),
});

joinMonsterAdapt(schema, merge(AccountMonster, BlockMonster, DelegateMonster));

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Graphiql server listening on http://localhost:${port}/graphiql`);
});
