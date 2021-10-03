const PassengerJourney = require('../models/passengerJourney.model');

const passengerJourneyStart = async (req, res, next) => {
  try {
    const { accountId, journeyId, depatureLat, depatureLong } = req.body;
    const passengerJourney = new PassengerJourney(accountId, journeyId);
    const val = await passengerJourney.findPassengerJourney();
    console.log("🚀 ~ file: passenger.controller.js ~ line 8 ~ passengerJourneyStart ~ val", val)
    if (!passengerJourney.id) {
      console.log("🚀 ~ file: passenger.controller.js ~ line 9 ~ if", passengerJourney.findPassengerJourney())
      passengerJourney.startJurney(depatureLat, depatureLong);
    } else {
      console.log("🚀 ~ file: passenger.controller.js ~ line 9 ~ else", passengerJourney.findPassengerJourney())
    }
    res.status(200).json({
      success: true,
      data: passengerJourney,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: {...req.body},
    });
  }
};

const passengerJourneyEnd = async (req, res, next) => {};

module.exports = { passengerJourneyStart, passengerJourneyEnd };
