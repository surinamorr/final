const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const createAdmin = async (first_name, last_name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO admin_login (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

const getAdminById = (admin_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM admin_login WHERE admin_id = ?',
      [admin_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const getAdminByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM admin_login WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

module.exports = { createAdmin, getAdminById, getAdminByEmail };
