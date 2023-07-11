const Sequelize = require('sequelize');

//create new instance of sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});
//test connection
sequelize.authenticate()
            .then(() => {
                console.log("Connection established");
            })
            .catch(err => {
                console.log("error connecting", err);
            })

//export sequelize instance
module.exports = sequelize;