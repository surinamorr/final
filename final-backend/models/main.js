const pool = require('../config/db');

// Create a new main course
const createMain = (name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO mains (name, price) VALUES (?, ?)',
      [name, price],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Get a main course by ID
const getMainById = (main_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM mains WHERE main_id = ?',
      [main_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

// Get all main courses
const getAllMains = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM mains',
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Update a main course by ID
const updateMain = (main_id, name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE mains SET name = ?, price = ? WHERE main_id = ?',
      [name, price, main_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Delete a main course by ID
const deleteMain = (main_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM mains WHERE main_id = ?',
      [main_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = { createMain, getMainById, getAllMains, updateMain, deleteMain };
