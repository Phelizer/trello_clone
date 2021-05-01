import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'trello_dev',
  password: '1111',
  port: 5432,
});
