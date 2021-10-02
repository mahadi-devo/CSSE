const Sequelize = require("sequelize");

const database = new Sequelize(
  "ticketingsystem",
  "root",
  "123456",
  {
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: true,
    },
  }
);

database.sync();

module.exports = database;
