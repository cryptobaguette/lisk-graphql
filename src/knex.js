const Knex = require('knex');

exports.knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.LISK_DB_HOST,
    user: process.env.LISK_DB_USER,
    password: process.env.LISK_DB_PASSWORD,
    database: process.env.LISK_DB_DATABASE,
  },
});
