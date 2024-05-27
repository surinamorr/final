const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dessert = sequelize.define('Dessert', {
  dessert_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Dessert;