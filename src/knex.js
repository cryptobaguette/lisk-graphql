const Knex = require('knex');

// eslint-disable-next-line
const config = require('../config.json');

exports.knex = Knex({
  client: 'pg',
  connection: config.connection,
});
