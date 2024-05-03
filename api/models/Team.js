// models/Team.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
    name: DataTypes.STRING
}, {
    timestamps: true
});

module.exports = Team;