const pool = require('../config/db');

// Create a new order detail
const createOrderDetail = (order_id, item_type, item_id, quantity, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO order_details (order_id, item_type, item_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
      [order_id, item_type, item_id, quantity, price],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Get an order detail by ID
const getOrderDetailById = (order_detail_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM order_details WHERE order_detail_id = ?',
      [order_detail_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

// Get all order details by order ID
const getAllOrderDetailsByOrderId = (order_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM order_details WHERE order_id = ?',
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

// Update an order detail by ID
const updateOrderDetail = (order_detail_id, order_id, item_type, item_id, quantity, price) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE order_details SET order_id = ?, item_type = ?, item_id = ?, quantity = ?, price = ? WHERE order_detail_id = ?',
      [order_id, item_type, item_id, quantity, price, order_detail_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

// Delete an order detail by ID
const deleteOrderDetail = (order_detail_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM order_details WHERE order_detail_id = ?',
      [order_detail_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports = { createOrderDetail, getOrderDetailById, getAllOrderDetailsByOrderId, updateOrderDetail, deleteOrderDetail };
