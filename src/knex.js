const Knex = require('knex');

const config = require('../config.json');

exports.knex = Knex({
  client: 'pg',
  connection: config.connection,
});
