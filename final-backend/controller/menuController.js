// const pool = require('../config/db');

// // Get all menu items
// const getMenuItems = async (req, res) => {
//   try {
//     const [starters] = await pool.promise().query('SELECT * FROM starters');
//     const [mains] = await pool.promise().query('SELECT * FROM mains');
//     const [desserts] = await pool.promise().query('SELECT * FROM desserts');
//     const [sides] = await pool.promise().query('SELECT * FROM sides');
//     res.json({ starters, mains, desserts, sides });
//   } catch (error) {
//     console.error('Error fetching menu items:', error);
//     res.status(500).json({ error: 'An error occurred while fetching menu items.' });
//   }
// };

// // Add a new menu item
// const addMenuItem = async (req, res) => {
//   const { type, name, price } = req.body;
//   let tableName;
//   switch (type) {
//     case 'starter':
//       tableName = 'starters';
//       break;
//     case 'main':
//       tableName = 'mains';
//       break;
//     case 'dessert':
//       tableName = 'desserts';
//       break;
//     case 'side':
//       tableName = 'sides';
//       break;
//     default:
//       return res.status(400).json({ error: 'Invalid menu item type.' });
//   }

//   try {
//     const [result] = await pool.promise().query(
//       `INSERT INTO ${tableName} (name, price) VALUES (?, ?)`,
//       [name, price]
//     );
//     res.status(201).json({ id: result.insertId, name, price });
//   } catch (error) {
//     console.error('Error adding menu item:', error);
//     res.status(500).json({ error: 'An error occurred while adding a menu item.' });
//   }
// };

// module.exports = { getMenuItems, addMenuItem };


const db = require('../config/db');

exports.getMenuItems = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM menu');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching menu items.' });
  }
};

exports.addMenuItem = async (req, res) => {
  const { type, name, price } = req.body;
  try {
    const [result] = await db.query('INSERT INTO menu (type, name, price) VALUES (?, ?, ?)', [type, name, price]);
    const newMenuItem = { id: result.insertId, type, name, price };
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding a menu item.' });
  }
};
