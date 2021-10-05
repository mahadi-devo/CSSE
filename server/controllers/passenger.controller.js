const PassengerJourney = require('../models/passengerJourney.model');

const passengerJourney = async (req, res, next) => {
  try {
    const { accountId, journeyId, depatureLat, depatureLong } = req.body;
    const passengerJourney = new PassengerJourney(accountId, journeyId);
    console.log("🚀 ~ file: passenger.controller.js ~ line 7 ~ passengerJourney ~ passengerJourney", passengerJourney)
    const val = await passengerJourney.findPassengerJourney();
    if (!val) {
      passengerJourney.startJurney(depatureLat, depatureLong);
    } else {
      passengerJourney.endJurney(depatureLat, depatureLong);
    }
    res.status(200).json({
      success: true,
      data: passengerJourney,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: { ...req.body },
    });
  }
};

const passengerJourneyHistory = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const passengerJourney = new PassengerJourney(accountId, null);
    const data = await passengerJourney.getPassengerJourney();
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: { ...req.body },
    });
  }
};

const getAllPassengerJourneyHistory = async (req, res, next) => {
  try {
    const passengerJourney = new PassengerJourney();
    const data = await passengerJourney.getAllPassengerJourney();
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: { ...req.body },
    });
  }
};

module.exports = { passengerJourney, passengerJourneyHistory, getAllPassengerJourneyHistory };
