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
    this.createAt = null;
  }

  async findPassengerJourney() {
    try {
      const passengerJourney = await models.passengerhistory.findOne({
        attributes: [
          'id',
          'depatureLat',
          'depatureLong',
          'destinationLat',
          'destinationLong',
        ],
        where: { accountId: this.accountId, journeyId: this.journeyId },
      });
      console.log("🚀 ~ file: passengerJourney.model.js ~ line 30 ~ PassengerJourney ~ findPassengerJourney ~ passengerJourney", passengerJourney)

      if (passengerJourney) {
        this.depatureLat = passengerJourney.depatureLat;
        this.depatureLong = passengerJourney.depatureLong;
        this.destinationLat = passengerJourney.destinationLat;
        this.destinationLong = passengerJourney.destinationLong;
      } else {
      console.log("🚀 ~ file: false", passengerJourney)
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
          accountId: 35,
          journeyId: 2,
        },
        { transaction: t }
      );

      this.createAt = passengerJourney.dataValues.createAt;
    });
  }

  async endJurney(destinatLat, destinatLong) {
    this.destinationLat = destinatLat;
    this.destinationLong = destinatLong;

    await db.transaction(async (t) => {
      await models.passengerhistory.update(
        {
          destinatLat,
          destinatLong,
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

      const newCreditAmount = account.creditAmount - getTicketPrice();

      await models.passengerhistory.update(
        {
          creditAmount: newCreditAmount 
        },
        {
          where: {
            id: this.accountId
          },
          transaction: t,
        }
      );
    });
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
