const initModels = require("../dao/init-models");
const db = require("../config/db");
const models = initModels(db);

class Passenger {
  constructor() {}

  async createPassenger(name, nic, address, passportNo) {
    return models.passengers.create({ name, nic, address, passportNo });
  }
}

module.exports = Passenger;
