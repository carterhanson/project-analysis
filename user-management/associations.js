const sequelize = require('./database');
const User = require('./models/User');
const Role = require('./models/Role');

// TODO: Define associations here
Role.hasMany(User);
// Sync all models
sequelize.sync();