// api/models/ChatMessage.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

class ChatMessage extends Model {}

ChatMessage.init({
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    sender_info: {
        type: DataTypes.STRING,
        allowNull: true
    },
    memberId: {
        type: DataTypes.TEXT,
        allowNull: true  // set allowNull based on your requirements
    }
}, {
    sequelize,
    modelName: 'ChatMessage'
});

module.exports = ChatMessage;
