const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./customer'); // Ensure you have the Customer model

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: 'customer_id'
    }
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

Order.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = Order;
