const initModels = require('../dao/init-models');
const db = require('../config/db');
const models = initModels(db);
const { getDistance } = require('geolib');

class Fare {
  constructor(journeyId = null, passengerHistoryId = null, amount = null) {
    this.id = null;
    this.journeyId = journeyId;
    this.passengerHistoryId = passengerHistoryId;
    this.amount = amount;
  }

  async createFare(t) {
    console.log("🚀 ~ file: fare.model.js ~ line 15 ~ Fare ~ createFare ~ createFare")
    try {
        const fine = await models.fare.create(
          {
            journeyId: this.journeyId,
            passengerHistoryId: this.passengerHistoryId,
            amount: this.amount,
          },
          { where: { transaction: t } }
        );
        console.log("🚀 ~ file: fare.model.js ~ line 24 ~ Fare ~ createFare ~ fine", fine)

        this.id = fine.id;
        console.log("🚀 ~ file: fare.model.js ~ line 28 ~ Fare ~ createFare ~ this", this)
    } catch (e) {
      throw new Error(e);
    }
  }

}

module.exports = Fare;
