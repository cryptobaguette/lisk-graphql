const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');
const { merge } = require('lodash');

let config;
try {
  // eslint-disable-next-line
  config = require('../config.json');
} catch (error) {
  console.error(`
config.json file not found.
Please copy config.example.json as config.json and edit it.
  `);
  process.exit(-1);
}

const { middleware } = require('./lisk/helpers/http_api');
const convertConfigToLiskConfig = require('./helpers/convertConfigToLiskConfig');

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

// TODO convert config to standart lisk one
app.use(
  middleware.applyAPIAccessRules.bind(null, convertConfigToLiskConfig(config))
);

// Maximum 2mb body size for json type requests
app.use(bodyParser.json({ limit: '2mb' }));

/**
 * Instruct browser to deny display of <frame>, <iframe> regardless of origin.
 *
 * RFC -> https://tools.ietf.org/html/rfc7034
 */
app.use(middleware.attachResponseHeader.bind(null, 'X-Frame-Options', 'DENY'));

/**
 * Set Content-Security-Policy headers.
 *
 * frame-ancestors - Defines valid sources for <frame>, <iframe>, <object>, <embed> or <applet>.
 *
 * W3C Candidate Recommendation -> https://www.w3.org/TR/CSP/
 */
app.use(
  middleware.attachResponseHeader.bind(
    null,
    'Content-Security-Policy',
    "frame-ancestors 'none'"
  )
);

app.use('/graphql', graphqlExpress({ schema }));

if (config.graphiql) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Graphiql server listening on http://localhost:${port}/graphiql`);
});
