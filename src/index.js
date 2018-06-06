const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');
const joinMonster = require('join-monster').default;
const Knex = require('knex');

// TODO nice error message if not found
const config = require('../config.json');

const {
  typeDef: BlockTypeDef,
  monster: BlockMonster,
  resolver: BlockResolver,
} = require('./block');

const knex = Knex({
  client: 'pg',
  connection: config.connection,
});

// TODO sanityse sql queries inputs

const typeDefs = `
  type Query {
    block(id: ID!): Block
  }
`;

const resolvers = {
  Query: {
    block(parent, args, ctx, resolveInfo) {
      return joinMonster(resolveInfo, ctx, sql => {
        return knex.raw(sql);
      });
    },
  },
  Block: BlockResolver,
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, BlockTypeDef],
  resolvers,
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
