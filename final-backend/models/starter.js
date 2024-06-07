const pool = require('../config/db');

// Create a new starter
const createStarter = (name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO starters (name, price) VALUES (?, ?)',
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

// Get a starter by ID
const getStarterById = (starter_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM starters WHERE starter_id = ?',
      [starter_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

// Get all starters
const getAllStarters = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM starters',
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Update a starter by ID
const updateStarter = (starter_id, name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE starters SET name = ?, price = ? WHERE starter_id = ?',
      [name, price, starter_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Delete a starter by ID
const deleteStarter = (starter_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM starters WHERE starter_id = ?',
      [starter_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = { createStarter, getStarterById, getAllStarters, updateStarter, deleteStarter };
