// db.js
const { Pool } = require('pg');
const { db } = require('./config');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
  ssl: isProduction ? { rejectUnauthorized: false } : false,

});

module.exports = pool;
