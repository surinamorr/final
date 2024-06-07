const pool = require('../config/db');

// Create a new order
const createOrder = (customer_id, order_date, total_price, status) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO orders (customer_id, order_date, total_price, status) VALUES (?, ?, ?, ?)',
      [customer_id, order_date, total_price, status],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Get an order by ID
const getOrderById = (order_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM orders WHERE order_id = ?',
      [order_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

// Get all orders
const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT orders.*, customers.first_name, customers.last_name, customers.email ' +
      'FROM orders ' +
      'JOIN customers ON orders.customer_id = customers.customer_id',
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Update an order by ID
const updateOrder = (order_id, customer_id, order_date, total_price, status) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE orders SET customer_id = ?, order_date = ?, total_price = ?, status = ? WHERE order_id = ?',
      [customer_id, order_date, total_price, status, order_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Delete an order by ID
const deleteOrder = (order_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM orders WHERE order_id = ?',
      [order_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = { createOrder, getOrderById, getAllOrders, updateOrder, deleteOrder };
