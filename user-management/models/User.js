const { DataTypes } = require('sequelize');
//instance of database connection
const sequelize = require('../database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isEmployeed: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

module.exports = User;