const pool = require('../config/db');

// Create a new customer
const createCustomer = (first_name, last_name, email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO customers (first_name, last_name, email) VALUES (?, ?, ?)',
      [first_name, last_name, email],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Get a customer by ID
const getCustomerById = (customer_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM customers WHERE customer_id = ?',
      [customer_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

// Get all customers
const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM customers',
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Update a customer by ID
const updateCustomer = (customer_id, first_name, last_name, email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE customers SET first_name = ?, last_name = ?, email = ? WHERE customer_id = ?',
      [first_name, last_name, email, customer_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Delete a customer by ID
const deleteCustomer = (customer_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM customers WHERE customer_id = ?',
      [customer_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = { createCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer };
