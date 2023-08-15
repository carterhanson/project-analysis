const sequelize = require('./database');
const User = require('./models/User');
const Role = require('./models/Role');

// TODO: Define associations here
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
// Sync all models
sequelize.sync();