import * as Knex from 'knex';
import { config } from './config';

export const knex = Knex({
  client: 'pg',
  connection: config.connection,
});
