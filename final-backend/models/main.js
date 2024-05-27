const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Main = sequelize.define('Main', {
  main_id: {
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

module.exports = Main;