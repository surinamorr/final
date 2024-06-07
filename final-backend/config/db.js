const mysql2 = require('mysql2'); // Import mysql2

// Load environment variables from .env file
require('dotenv').config();

const pool = mysql2.createPool({
  connectionLimit: 15,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

module.exports = { pool };

