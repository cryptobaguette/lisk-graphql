require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as RateLimit from 'express-rate-limit';

const { middleware } = require('./lisk/helpers/http_api');
const { schema } = require('./graphql');

const app = express();

const defaultsRateLimit = {
  max: 0, // Disabled
  delayMs: 0, // Disabled
  delayAfter: 0, // Disabled
  windowMs: 60000, // 1 minute window
};

const limiter = new RateLimit(defaultsRateLimit);

app.use(limiter);

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

if (process.env.GRAPHIQL) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Graphiql server listening on http://localhost:${port}/graphiql`);
});
