import dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const DATABASE_NAME = process.env.DATABASE_NAME || 'test.db';
export const PORT = process.env.PORT || 3001;
export const NODE_ENV = process.env.NODE_ENV || 'development';
