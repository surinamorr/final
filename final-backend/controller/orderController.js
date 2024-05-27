const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const Customer = require('../models/customer');

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Customer }]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [{ model: Customer }, { model: OrderDetail }]
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
};

// Add a new order
const addOrder = async (req, res) => {
  const { customer_id, order_date, total_price, status, orderDetails } = req.body;
  try {
    const newOrder = await Order.create({ customer_id, order_date, total_price, status });
    for (let detail of orderDetails) {
      await OrderDetail.create({ ...detail, order_id: newOrder.order_id });
    }
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the order.' });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customer_id, order_date, total_price, status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      order.customer_id = customer_id;
      order.order_date = order_date;
      order.total_price = total_price;
      order.status = status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order.' });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the order.' });
  }
};

module.exports = { getOrders, getOrderById, addOrder, updateOrder, deleteOrder };
