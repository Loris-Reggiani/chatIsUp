// config/database.js
const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  port: 5432, // Specify the port number,
  dialectOptions: {
    ssl: true,
  },
  logging: false, // Toggle based on your need for SQL logging
});

module.exports = sequelize;
