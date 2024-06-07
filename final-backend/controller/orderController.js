// const pool = require('../config/db');

// // Get all orders
// const getOrders = async (req, res) => {
//   try {
//     const [orders] = await pool.promise().query(
//       'SELECT orders.*, customers.first_name, customers.last_name, customers.email ' +
//       'FROM orders ' +
//       'JOIN customers ON orders.customer_id = customers.customer_id'
//     );
//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ error: 'An error occurred while fetching orders.' });
//   }
// };

// // Get a single order by ID
// const getOrderById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [orders] = await pool.promise().query(
//       'SELECT orders.*, customers.first_name, customers.last_name, customers.email ' +
//       'FROM orders ' +
//       'JOIN customers ON orders.customer_id = customers.customer_id ' +
//       'WHERE orders.order_id = ?',
//       [id]
//     );

//     const [orderDetails] = await pool.promise().query(
//       'SELECT * FROM order_details WHERE order_id = ?',
//       [id]
//     );

//     if (orders.length > 0) {
//       res.json({ ...orders[0], orderDetails });
//     } else {
//       res.status(404).json({ error: 'Order not found.' });
//     }
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     res.status(500).json({ error: 'An error occurred while fetching the order.' });
//   }
// };

// // Add a new order
// const addOrder = async (req, res) => {
//   const { customer_id, order_date, total_price, status, orderDetails } = req.body;
//   try {
//     const [result] = await pool.promise().query(
//       'INSERT INTO orders (customer_id, order_date, total_price, status) VALUES (?, ?, ?, ?)',
//       [customer_id, order_date, total_price, status]
//     );

//     const newOrderId = result.insertId;
//     for (let detail of orderDetails) {
//       await pool.promise().query(
//         'INSERT INTO order_details (order_id, item_type, item_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
//         [newOrderId, detail.item_type, detail.item_id, detail.quantity, detail.price]
//       );
//     }
//     res.status(201).json({ order_id: newOrderId, customer_id, order_date, total_price, status, orderDetails });
//   } catch (error) {
//     console.error('Error adding order:', error);
//     res.status(500).json({ error: 'An error occurred while adding the order.' });
//   }
// };

// // Update an existing order
// const updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const { customer_id, order_date, total_price, status } = req.body;
//   try {
//     const [result] = await pool.promise().query(
//       'UPDATE orders SET customer_id = ?, order_date = ?, total_price = ?, status = ? WHERE order_id = ?',
//       [customer_id, order_date, total_price, status, id]
//     );

//     if (result.affectedRows > 0) {
//       res.json({ order_id: id, customer_id, order_date, total_price, status });
//     } else {
//       res.status(404).json({ error: 'Order not found.' });
//     }
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ error: 'An error occurred while updating the order.' });
//   }
// };

// // Delete an order
// const deleteOrder = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [result] = await pool.promise().query(
//       'DELETE FROM orders WHERE order_id = ?',
//       [id]
//     );

//     if (result.affectedRows > 0) {
//       res.json({ message: 'Order deleted successfully.' });
//     } else {
//       res.status(404).json({ error: 'Order not found.' });
//     }
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     res.status(500).json({ error: 'An error occurred while deleting the order.' });
//   }
// };

// module.exports = { getOrders, getOrderById, addOrder, updateOrder, deleteOrder };



const db = require('../config/db');

exports.getOrders = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM orders WHERE order_id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
};

exports.addOrder = async (req, res) => {
  const { customer_id, order_date, total_price, status } = req.body;
  try {
    const [result] = await db.query('INSERT INTO orders (customer_id, order_date, total_price, status) VALUES (?, ?, ?, ?)', [customer_id, order_date, total_price, status]);
    const newOrder = { order_id: result.insertId, customer_id, order_date, total_price, status };
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the order.' });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customer_id, order_date, total_price, status } = req.body;
  try {
    const [result] = await db.query('UPDATE orders SET customer_id = ?, order_date = ?, total_price = ?, status = ? WHERE order_id = ?', [customer_id, order_date, total_price, status, id]);
    if (result.affectedRows > 0) {
      const updatedOrder = { order_id: id, customer_id, order_date, total_price, status };
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order.' });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM orders WHERE order_id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Order deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the order.' });
  }
};
