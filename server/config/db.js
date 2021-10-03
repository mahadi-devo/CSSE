const Sequelize = require("sequelize");
const env = require("dotenv");

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  define: {
    timestamps: true,
  },
});

database.sync();

module.exports = database;
