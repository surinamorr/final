const express = require('express');
const router = express.Router();
const { getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');

// GET all customers
router.get('/', getCustomers);

// GET a single customer by ID
router.get('/:id', getCustomerById);

// POST a new customer
router.post('/', addCustomer);

// PUT to update an existing customer
router.put('/:id', updateCustomer);

// DELETE a customer
router.delete('/:id', deleteCustomer);

module.exports = router;
