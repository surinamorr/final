const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Register a new admin
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      'INSERT INTO admin_login (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error('Error registering admin:', error);
          return res.status(500).json({ error: 'Admin registration failed.' });
        }
        res.status(201).json({ message: 'Admin registered successfully!' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Admin registration failed.' });
  }
});

// Login an admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    pool.query(
      'SELECT * FROM admin_login WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Error logging in admin:', error);
          return res.status(500).json({ error: 'Login failed.' });
        }
        if (results.length === 0) {
          return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const admin = results[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
          { admin_id: admin.admin_id, email: admin.email },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

module.exports = router;
