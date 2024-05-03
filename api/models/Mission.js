// models/Mission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mission = sequelize.define('Mission', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
}, {
    timestamps: true
});

module.exports = Mission;