// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db');
 require('dotenv').config();

// function signJWTToken(user) {
//   return jwt.sign({
//     id: user.admin_id,
//     email: user.email
//   }, process.env.JWT_SECRET, { expiresIn: '1h' });
// }

// exports.signup = (req, res) => {
//   const { first_name, last_name, email, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 8);

//   pool.query(
//     'INSERT INTO admin_login (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
//     [first_name, last_name, email, hashedPassword],
//     (error, results) => {
//       if (error) {
//         console.error('Error on the server:', error);
//         return res.status(500).send('Error on the server.');
//       }
//       res.status(200).send('Admin registered successfully.');
//     }
//   );
// };

// exports.login = (req, res) => {
//   const { id, email, password } = req.body;

//   pool.query(
//     'SELECT * FROM admin_login WHERE admin_id = ? AND email = ?',
//     [id, email],
//     (error, results) => {
//       if (error) {
//         console.error('Error on the server:', error);
//         return res.status(500).send('Error on the server.');
//       }
//       if (results.length === 0) {
//         return res.status(404).send('No admin found.');
//       }

//       const user = results[0];
//       const passwordIsValid = bcrypt.compareSync(password, user.password);

//       if (!passwordIsValid) {
//         return res.status(401).send({ auth: false, token: null });
//       }

//       const token = signJWTToken(user);
//       res.status(200).send({ auth: true, token });
//     }
//   );
// };


const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO admin_login (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, hashedPassword]);
    const newAdmin = { admin_id: result.insertId, first_name, last_name, email };
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while signing up.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM admin_login WHERE email = ?', [email]);
    if (rows.length > 0) {
      const admin = rows[0];
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign({ admin_id: admin.admin_id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ token });
      } else {
        res.status(400).json({ error: 'Invalid email or password.' });
      }
    } else {
      res.status(400).json({ error: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
};
