 // Import Mysql2
 // const mysql2 = require('mysql2'); // Import mysql2
  import mysql2 from 'mysql2/promise'; // Import mysql2

// Load environment variables from .env file
  // require('dotenv').config();
  import dotenv from 'dotenv';

//Dot Env Configuration
  dotenv.config({ path: './config.env' });

export const pool = mysql2.createPool({
  connectionLimit: 15,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true
});

//module.exports = { pool };

