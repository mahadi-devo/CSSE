const initModels = require('../dao/init-models');
const db = require('../config/db');
const models = initModels(db);

class Journey {
  constructor(busId, routeId) {
    this.busId = busId;
    this.routeId = routeId;
    this.startDateTime = new Date().toISOString();
    this.endDateTime = null;
    this.id = null;
  }

  async isJournyExist(journeyId) {
    const journey = this.getJourny(journeyId);
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
      this.id = journey.id;
    });
  }

  async getJourny(journeyId) {
    try {
      return models.journey.findOne({
        attributes: ['id', 'busId', 'routeId', 'createdAt', 'updatedAt'],
        where: { id: journeyId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllJourny(journeyId) {
    try {
      return models.journey.findAll({
        attributes: ['id', 'busId', 'routeId', 'createdAt', 'updatedAt'],
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Journey;
