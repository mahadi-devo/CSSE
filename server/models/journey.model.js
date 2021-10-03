const initModels = require('../dao/init-models');
const db = require('../config/db');
const models = initModels(db);
const Passenger = require('../models/passenger.model');

class Journey {
  constructor(busId, routeId) {
    this.busId = busId;
    this.routeId = routeId;
    this.startDateTime = new Date().toISOString();
    this.endDateTime = null;
  }

  async isJournyExist(journeyId) {
    const journey = getJourny(journeyId);
    return journey ? true : false;
  }

  async createJourny() {
    await db.transaction(async (t) => {
      const journey = await models.journey.create(
        {
          busId: this.busId,
          routeId: this.routeId,
          startDateTime: this.startDateTime,
        },
        { transaction: t }
      );
    });
  }

  async getJourny(journeyId) {
    try {
      return models.journey.findOne({
        attributes: ['id', 'busId', 'routeId', 'startDateTime', 'endDateTime'],
        where: { id: journeyId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllJourny(journeyId) {
    try {
      return models.journey.findAll({
        attributes: ['id', 'busId', 'routeId', 'startDateTime', 'endDateTime'],
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Journey;