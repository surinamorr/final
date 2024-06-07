const pool = require('../config/db');

// Create a new side
const createSide = (name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO sides (name, price) VALUES (?, ?)',
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

// Get a side by ID
const getSideById = (side_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM sides WHERE side_id = ?',
      [side_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

// Get all sides
const getAllSides = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM sides',
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Update a side by ID
const updateSide = (side_id, name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE sides SET name = ?, price = ? WHERE side_id = ?',
      [name, price, side_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Delete a side by ID
const deleteSide = (side_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM sides WHERE side_id = ?',
      [side_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = { createSide, getSideById, getAllSides, updateSide, deleteSide };
