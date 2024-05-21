// config/database.js
const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();

//export DATABASE_URL=production

//DATABASE_URL=postgres://user:password@localhost:5432/lolo

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://lorisreggiani:postgres@localhost:5432/lolo', {
  dialect: "postgres",
  port: 5432, // Specify the port number,
  dialectOptions: {
    ssl: false,
  },
  logging: false, // Toggle based on your need for SQL logging
});

module.exports = sequelize;
