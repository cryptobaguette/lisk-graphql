const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');
const { merge } = require('lodash');

// TODO nice error message if not found
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
  typeDef: BlockTypeDef,
  monster: BlockMonster,
  Query: BlockQuery,
  resolver: BlockResolver,
} = require('./block');

// TODO sanityse sql queries inputs

const typeDefs = `
  type Query {
    # Gets block by provided id.
    block(id: ID!): Block

    # Get transaction fee for sending "normal" transactions.
    getFee: Int!
  }
`;

const resolvers = {
  Query: merge(BlockQuery),
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, BlockTypeDef],
  resolvers: merge(resolvers, BlockResolver),
});

joinMonsterAdapt(schema, {
  Query: {
    fields: {
      block: {
        where: (table, args) => `${table}.b_id = '${args.id}'`,
      },
    },
  },
  Block: BlockMonster,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Graphiql server listening on http://localhost:${port}/graphiql`);
});
