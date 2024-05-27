const Starter = require('../models/starter');
const Main = require('../models/main');
const Dessert = require('../models/dessert');
const Side = require('../models/side');

const getMenuItems = async (req, res) => {
  try {
    const starters = await Starter.findAll();
    const mains = await Main.findAll();
    const desserts = await Dessert.findAll();
    const sides = await Side.findAll();
    res.json({ starters, mains, desserts, sides });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching menu items.' });
  }
};

const addMenuItem = async (req, res) => {
  const { type, name, price } = req.body;
  try {
    let newItem;
    switch (type) {
      case 'starter':
        newItem = await Starter.create({ name, price });
        break;
      case 'main':
        newItem = await Main.create({ name, price });
        break;
      case 'dessert':
        newItem = await Dessert.create({ name, price });
        break;
      case 'side':
        newItem = await Side.create({ name, price });
        break;
    }
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding a menu item.' });
  }
};

module.exports = { getMenuItems, addMenuItem };
