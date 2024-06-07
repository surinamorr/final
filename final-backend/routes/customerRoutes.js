const express = require('express');
const { createCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer } = require('../models/customer');

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
});

// Get a single customer by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await getCustomerById(id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'An error occurred while fetching the customer.' });
  }
});

// Add a new customer
router.post('/', async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const result = await createCustomer(first_name, last_name, email);
    res.status(201).json({ id: result.insertId, first_name, last_name, email });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'An error occurred while adding the customer.' });
  }
});

// Update an existing customer
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;
  try {
    const result = await updateCustomer(id, first_name, last_name, email);
    if (result.affectedRows > 0) {
      res.json({ id, first_name, last_name, email });
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'An error occurred while updating the customer.' });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCustomer(id);
    if (result.affectedRows > 0) {
      res.json({ message: 'Customer deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'An error occurred while deleting the customer.' });
  }
});

module.exports = router;
