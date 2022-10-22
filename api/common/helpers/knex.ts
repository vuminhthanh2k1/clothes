import { Knex } from 'knex';

export const knex: Knex = require('knex')
({
  client: 'pg'
});
