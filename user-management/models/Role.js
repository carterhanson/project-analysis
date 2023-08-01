const { DataTypes } = require('sequelize');
//instance of database connection
const sequelize = require('../database');

const Role = sequelize.define('Role', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    } 
});

module.exports = Role;