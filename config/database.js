// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;

