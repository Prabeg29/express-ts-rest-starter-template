import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env')});

export default {
  app: {
    port: process.env.APP_PORT || 3000,
    url : process.env.APP_URL || 'http://localhost:3000'
  },
  db: {
    client  : process.env.DB_CONNECTION || 'mysql2',
    host    : process.env.NODE_ENV === 'test' ? process.env.DB_TEST_HOST : process.env.DB_HOST,
    port    : process.env.DB_PORT || 3306,
    database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE,
    user    : process.env.DB_USERNAME || 'express-ts-api',
    password: process.env.DB_PASSWORD || ''
  },
};
