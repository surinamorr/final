const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

// GET all orders
router.get('/', getOrders);

// GET a single order by ID
router.get('/:id', getOrderById);

// POST a new order
router.post('/', addOrder);

// PUT to update an existing order
router.put('/:id', updateOrder);

// DELETE an order
router.delete('/:id', deleteOrder);

module.exports = router;
