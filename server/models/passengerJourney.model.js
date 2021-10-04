const initModels = require('../dao/init-models');
const db = require('../config/db');
const models = initModels(db);
const { getDistance, convertDistance } = require('geolib');

class PassengerJourney {
  constructor(accountId, journeyId) {
    this.id = null;
    this.accountId = accountId;
    this.journeyId = journeyId;
    this.depatureLat = null;
    this.depatureLong = null;
    this.destinationLat = null;
    this.destinationLong = null;
    this.createdAt = null;
  }

  async findPassengerJourney() {
    let whereQuary = {};
    if (this.accountId) whereQuary.accountId = this.accountId;
    if (this.journeyId) whereQuary.journeyId = this.journeyId;
    console.log("🚀 ~ file: passengerJourney.model.js ~ line 20 ~ PassengerJourney ~ findPassengerJourney ~ whereQuary", whereQuary)
    try {
      const passengerJourney = await models.passengerhistory.findOne({
        attributes: [
          'id',
          'depatureLat',
          'depatureLong',
          'destinationLat',
          'destinationLong',
          'createdAt',
          'updatedAt',
        ],
        where: whereQuary,
      });

      if (passengerJourney) {
        this.id = passengerJourney.id;
        this.createdAt = passengerJourney.dataValues.createdAt;
        this.updatedAt = passengerJourney.dataValues.updatedAt;
        this.depatureLat = passengerJourney.depatureLat;
        this.depatureLong = passengerJourney.depatureLong;
        this.destinationLat = passengerJourney.destinationLat;
        this.destinationLong = passengerJourney.destinationLong;
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async startJurney(depatureLat, depatureLong) {
    this.depatureLat = depatureLat;
    this.depatureLong = depatureLong;

    await db.transaction(async (t) => {
      const passengerJourney = await models.passengerhistory.create(
        {
          depatureLat: this.depatureLat,
          depatureLong: this.depatureLong,
          accountId: this.accountId,
          journeyId: this.journeyId,
        },
        { transaction: t }
      );
      this.id = passengerJourney.id;
      this.createdAt = passengerJourney.dataValues.createdAt;
      this.updatedAt = passengerJourney.dataValues.updatedAt;
    });
  }

  async endJurney(destinationLat, destinationLong) {
    this.destinationLat = destinationLat;
    this.destinationLong = destinationLong;

    await db.transaction(async (t) => {
      await models.passengerhistory.update(
        {
          destinationLat,
          destinationLong,
        },
        {
          where: {
            journeyId: this.journeyId,
            accountId: this.accountId,
          },
          transaction: t,
        }
      );

      const account = await models.account.findOne({
        attributes: ['creditAmount'],
        where: { id: this.accountId },
        transaction: t,
      });

      const newCreditAmount =
        (await account.creditAmount) - this.getTicketPrice();

      await models.passengerhistory.update(
        {
          creditAmount: newCreditAmount,
        },
        {
          where: {
            id: this.accountId,
          },
          transaction: t,
        }
      );
    });
  }

  async passengerJourneyHistory() {
    console.log("🚀 ~ file: passengerJourney.model.js ~ line 117 ~ PassengerJourney ~ passengerJourneyHistory ~ passengerJourneyHistory")
    try {
      return await models.passengerhistory.findAll({
        attributes: [
          'id',
          'depatureLat',
          'depatureLong',
          'destinationLat',
          'destinationLong',
          'createdAt',
          'updatedAt',
        ],
        include: {
          model: models.journey,
          as: "journey",
        },
        where: { accountId: 35 }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTicketPrice() {
    return 5 * this.getPasangerDistanceInKM();
  }

  async getPasangerDistanceInKM() {
    const Distance = getDistance(
      {
        latitude: this.depatureLat,
        longitude: this.depatureLong,
      },
      {
        latitude: this.destinationLat,
        longitude: this.destinationLong,
      }
    );

    const DistanceInM = convertDistance(Distance, 'm');
    return DistanceInM / 1000;
  }
}

module.exports = PassengerJourney;
