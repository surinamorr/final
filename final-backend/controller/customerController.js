const Customer = require('../models/customer');

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
};

// Get a single customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the customer.' });
  }
};

// Add a new customer
const addCustomer = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const newCustomer = await Customer.create({ first_name, last_name, email });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the customer.' });
  }
};

// Update an existing customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      customer.first_name = first_name;
      customer.last_name = last_name;
      customer.email = email;
      await customer.save();
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the customer.' });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      await customer.destroy();
      res.json({ message: 'Customer deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the customer.' });
  }
};

module.exports = { getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer };
