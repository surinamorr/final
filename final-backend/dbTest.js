import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    console.log('Connection successful');
    await connection.end();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();
