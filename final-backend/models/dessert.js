const pool = require('../config/db');

// Create a new dessert
const createDessert = (name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO desserts (name, price) VALUES (?, ?)',
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

// Get a dessert by ID
const getDessertById = (dessert_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM desserts WHERE dessert_id = ?',
      [dessert_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

// Get all desserts
const getAllDesserts = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM desserts',
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Update a dessert by ID
const updateDessert = (dessert_id, name, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE desserts SET name = ?, price = ? WHERE dessert_id = ?',
      [name, price, dessert_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Delete a dessert by ID
const deleteDessert = (dessert_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM desserts WHERE dessert_id = ?',
      [dessert_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = { createDessert, getDessertById, getAllDesserts, updateDessert, deleteDessert };
