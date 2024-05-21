// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
}, {
    timestamps: false
});

module.exports = User;
