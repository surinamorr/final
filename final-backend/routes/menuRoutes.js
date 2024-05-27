const express = require('express');
const router = express.Router();
const { getMenuItems, addMenuItem } = require('../controllers/menuController');

router.get('/', getMenuItems);
router.post('/', addMenuItem);

module.exports = router;
