// models/SurveyResponse.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SurveyResponse = sequelize.define('SurveyResponse', {
    occupation: DataTypes.STRING,
    rating: DataTypes.STRING,
    experience: DataTypes.STRING,
    source: DataTypes.STRING,
    feedback: DataTypes.TEXT
}, {
    timestamps: true
});

module.exports = SurveyResponse;
