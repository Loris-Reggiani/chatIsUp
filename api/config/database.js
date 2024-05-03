// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lolo', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false // Toggle based on your need for SQL logging
});

module.exports = sequelize;
