const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./order'); // Ensure you have the Customer model

const Order_Details = sequelize.define('Order_Details', {
  order_details_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'order_id'
    }
  },
  item_type: {
    type: DataTypes.DECIMAL(10, 2),
    values: ['starter', 'main', 'dessert', 'side'],
    defaultValue: ' '
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    
  }
});

Order_Details.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Order_Details;