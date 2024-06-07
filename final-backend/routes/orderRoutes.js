const express = require('express');
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require('../models/order');

const {
  createOrderDetail,
  getAllOrderDetailsByOrderId
} = require('../models/orderDetail');

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await getOrderById(id);
    if (order) {
      const orderDetails = await getAllOrderDetailsByOrderId(id);
      res.json({ ...order, orderDetails });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
});

// Add a new order
router.post('/', async (req, res) => {
  const { customer_id, order_date, total_price, status, orderDetails } = req.body;
  try {
    const result = await createOrder(customer_id, order_date, total_price, status);
    const newOrderId = result.insertId;

    for (let detail of orderDetails) {
      await createOrderDetail(newOrderId, detail.item_type, detail.item_id, detail.quantity, detail.price);
    }

    res.status(201).json({ order_id: newOrderId, customer_id, order_date, total_price, status, orderDetails });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'An error occurred while adding the order.' });
  }
});

// Update an existing order
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { customer_id, order_date, total_price, status } = req.body;
  try {
    const result = await updateOrder(id, customer_id, order_date, total_price, status);
    if (result.affectedRows > 0) {
      res.json({ order_id: id, customer_id, order_date, total_price, status });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'An error occurred while updating the order.' });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteOrder(id);
    if (result.affectedRows > 0) {
      res.json({ message: 'Order deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'An error occurred while deleting the order.' });
  }
});

module.exports = router;
