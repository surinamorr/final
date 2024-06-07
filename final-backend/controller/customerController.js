// 

const db = require('../config/db');

exports.getCustomers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the customer.' });
  }
};

exports.addCustomer = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const [result] = await db.query('INSERT INTO customers (first_name, last_name, email) VALUES (?, ?, ?)', [first_name, last_name, email]);
    const newCustomer = { customer_id: result.insertId, first_name, last_name, email };
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the customer.' });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;
  try {
    const [result] = await db.query('UPDATE customers SET first_name = ?, last_name = ?, email = ? WHERE customer_id = ?', [first_name, last_name, email, id]);
    if (result.affectedRows > 0) {
      const updatedCustomer = { customer_id: id, first_name, last_name, email };
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the customer.' });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM customers WHERE customer_id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Customer deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the customer.' });
  }
};
