const express = require('express');
const {
  createStarter,
  getStarterById,
  getAllStarters,
  updateStarter,
  deleteStarter
} = require('../models/starter');

const {
  createMain,
  getMainById,
  getAllMains,
  updateMain,
  deleteMain
} = require('../models/main');

const {
  createDessert,
  getDessertById,
  getAllDesserts,
  updateDessert,
  deleteDessert
} = require('../models/dessert');

const {
  createSide,
  getSideById,
  getAllSides,
  updateSide,
  deleteSide
} = require('../models/side');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const starters = await getAllStarters();
    const mains = await getAllMains();
    const desserts = await getAllDesserts();
    const sides = await getAllSides();
    res.json({ starters, mains, desserts, sides });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'An error occurred while fetching menu items.' });
  }
});

// Get a single menu item by type and ID
router.get('/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  try {
    let item;
    switch (type) {
      case 'starter':
        item = await getStarterById(id);
        break;
      case 'main':
        item = await getMainById(id);
        break;
      case 'dessert':
        item = await getDessertById(id);
        break;
      case 'side':
        item = await getSideById(id);
        break;
      default:
        return res.status(400).json({ error: 'Invalid menu item type.' });
    }
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found.` });
    }
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'An error occurred while fetching the menu item.' });
  }
});

// Add a new menu item
router.post('/', async (req, res) => {
  const { type, name, price } = req.body;
  try {
    let newItem;
    switch (type) {
      case 'starter':
        newItem = await createStarter(name, price);
        break;
      case 'main':
        newItem = await createMain(name, price);
        break;
      case 'dessert':
        newItem = await createDessert(name, price);
        break;
      case 'side':
        newItem = await createSide(name, price);
        break;
      default:
        return res.status(400).json({ error: 'Invalid menu item type.' });
    }
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'An error occurred while adding the menu item.' });
  }
});

// Update an existing menu item
router.put('/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const { name, price } = req.body;
  try {
    let result;
    switch (type) {
      case 'starter':
        result = await updateStarter(id, name, price);
        break;
      case 'main':
        result = await updateMain(id, name, price);
        break;
      case 'dessert':
        result = await updateDessert(id, name, price);
        break;
      case 'side':
        result = await updateSide(id, name, price);
        break;
      default:
        return res.status(400).json({ error: 'Invalid menu item type.' });
    }
    if (result.affectedRows > 0) {
      res.json({ id, name, price });
    } else {
      res.status(404).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found.` });
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'An error occurred while updating the menu item.' });
  }
});

// Delete a menu item
router.delete('/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  try {
    let result;
    switch (type) {
      case 'starter':
        result = await deleteStarter(id);
        break;
      case 'main':
        result = await deleteMain(id);
        break;
      case 'dessert':
        result = await deleteDessert(id);
        break;
      case 'side':
        result = await deleteSide(id);
        break;
      default:
        return res.status(400).json({ error: 'Invalid menu item type.' });
    }
    if (result.affectedRows > 0) {
      res.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.` });
    } else {
      res.status(404).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found.` });
    }
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the menu item.' });
  }
});

module.exports = router;
