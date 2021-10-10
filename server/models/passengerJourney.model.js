const initModels = require('../dao/init-models');
const db = require('../config/db');
const models = initModels(db);
const { getDistance, convertDistance } = require('geolib');
const REPORT = require('./report.model');
const REPORTS = require('../common/enum/reports');
const Fare = require('./fare.model');

class PassengerJourney {
  constructor(accountId = null, journeyId = null) {
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

  async startJourney(depatureLat, depatureLong) {
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

  async endJourney(destinationLat, destinationLong, isFare, isFine) {
    this.destinationLat = destinationLat;
    this.destinationLong = destinationLong;

    await db.transaction(async (t) => {
      const account = await models.account.findOne({
        attributes: ['creditAmount'],
        where: { id: this.accountId },
        transaction: t,
      });
      console.log(
        '🚀 ~ file: passengerJourney.model.js ~ line 86 ~ PassengerJourney ~ awaitdb.transaction ~ account',
        account
      );

      const tickteAmount = await this.getTicketPrice();
      let newCreditAmount = await account.dataValues.creditAmount;
      let updateQuary = { destinationLat, destinationLong };
      if (isFare) {
        console.log(
          '🚀 ~ file: passengerJourney.model.js ~ line 92 ~ PassengerJourney ~ awaitdb.transaction ~ isFare',
          isFare
        );
        const fare = await new Fare(
          this.journeyId,
          this.accountId,
          tickteAmount
        );
        console.log(
          '🚀 ~ file: passengerJourney.model.js ~ line 94 ~ PassengerJourney ~ awaitdb.transaction ~ fare',
          fare
        );

        await fare.createFare(t);

        updateQuary.fareId = fare.id;
        newCreditAmount -= tickteAmount;
      }

      if (isFine) {
        // fine calc
      }

      await models.account.update(
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

      await models.passengerhistory.update(updateQuary, {
        where: {
          journeyId: this.journeyId,
          accountId: this.accountId,
        },
        transaction: t,
      });
    });
  }

  async passengerJourneyHistory() {
    console.log(
      '🚀 ~ file: passengerJourney.model.js ~ line 117 ~ PassengerJourney ~ passengerJourneyHistory ~ passengerJourneyHistory'
    );
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
          as: 'journey',
        },
        where: { accountId: this.accountId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTicketPrice() {
    return 5 * 10;
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

  async getAllPassengerJourney() {
    try {
      const passengerHistory = await models.passengerhistory.findAll({
        include: [
          {
            model: models.account,
            as: 'account',
            include: { model: models.passengers, as: 'passenger' },
          },
          {
            model: models.journey,
            as: 'journey',
            include: {
              model: models.inspection,
              as: 'inspections',
              include: { model: models.employee, as: 'inspector' },
            },
          },
          {
            model: models.fine,
            as: 'fine',
          },
          {
            model: models.fare,
            as: 'fare',
          },
        ],
      });

      const header = [
        'Account Id',
        'Passenger Name',
        'Date',
        'Departure',
        'Destination',
        'Fair',
        'Fines',
      ];
      let body = [];

      const data = passengerHistory.map((passenger) =>
        passenger.get({ plain: true })
      );

      data.forEach((passenger) => {
        const detailsObj = {};
        detailsObj.accountId = passenger.account.id;
        // detailsObj.passengerName = 'name';
        detailsObj.passengerName = passenger.account.passenger.name;
        detailsObj.Date = passenger.createdAt;
        detailsObj.depatureLocation = 'test';
        // {
        //   lat: passenger.depatureLat,
        //   long: passenger.depatureLong,
        // };
        detailsObj.destinationLocation = 'test';
        // {
        //   lat: passenger.destinationLat,
        //   long: passenger.destinationLong,
        // };
        detailsObj.fare = (passenger.fare && passenger.fare['amount']) || null;
        detailsObj.fine = (passenger.fine && passenger.fine['amount']) || null;
        body.push(detailsObj);
      });

      /**
       *{
          "accountId": "ABC",
          "Date": "2021-10-09",
          "depatureLocation": {
              "lat": "8.142135",
              "long": "80.96973"
          },
          "destinationLocation": {
              "lat": "8.041785",
              "long": "80.953232"
          },
          "fare": 50,
          "fine": 100
        },
       */

      const report = new REPORT(
        REPORTS.JOURNEY_DETAILS.title,
        REPORTS.JOURNEY_DETAILS.description,
        REPORTS.JOURNEY_DETAILS.type
      );

      const journeyDetailsReport = await report.createReport(header, body);
      // const journeyDetailsReport = body;

      return { passengerHistory, body };
    } catch (error) {
      console.log(
        '🚀 ~ file: passengerJourney.model.js ~ line 262 ~ PassengerJourney ~ getAllPassengerJourney ~ error',
        error
      );
    }
  }

  async getPassengerJourney() {
    return await models.passengerhistory.findAll({
      include: [
        {
          model: models.account,
          as: 'account',
          include: { model: models.passengers, as: 'passenger' },
        },
        {
          model: models.journey,
          as: 'journey',
          include: {
            model: models.inspection,
            as: 'inspections',
            include: { model: models.employee, as: 'inspector' },
          },
        },
        {
          model: models.fine,
          as: 'fine',
        },
        {
          model: models.fare,
          as: 'fare',
        },
      ],
      where: { accountId: this.accountId },
    });
  }
}

module.exports = PassengerJourney;
