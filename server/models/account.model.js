const initModels = require("../dao/init-models");
const db = require("../config/db");
const models = initModels(db);
const Passenger = require("../models/passenger.model");

class Account {
  constructor() {}

  async createAccount(
    creditAmount,
    name,
    nic,
    address,
    passportNo,
    password,
    email
  ) {
    let account;
    await db.transaction(async (t) => {
      const passenger = new Passenger();
      const passengerObj = await passenger.createPassenger(
        name,
        nic,
        address,
        passportNo
      );
      await models.account.create(
        {
          password,
          email,
          creditAmount,
          passengerId: passengerObj.id,
        },
        { transaction: t }
      );
    });
    return account;
  }

  addCredit() {}

  getCreditBalance() {}
}

module.exports = Account;
