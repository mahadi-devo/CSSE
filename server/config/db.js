const Sequelize = require("sequelize");

const database = new Sequelize(
  "ticketingsystem", // name database
  "root", // user database
  "123456", // password database
  {
    host: "localhost",
    dialect: "mysql", // mariadb / sqlite / postgres
  }
);

database.sync();

module.exports = database;
