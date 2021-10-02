const { Op } = require('sequelize');
const { DataTypes } = require('sequelize');
const _passengers = require("./passengers");

function initModels(sequelize) {
  const passengers = _passengers(sequelize, DataTypes);


  return {
    Op,
    passengers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
