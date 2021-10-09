const PassengerJourney = require('../models/passengerJourney.model');

const passengerJourney = async (req, res, next) => {
  try {
    const { accountId, journeyId, depatureLat, depatureLong, isFare, isFine } = req.body;
    const passengerJourney = new PassengerJourney(accountId, journeyId);
    const val = await passengerJourney.findPassengerJourney();
    if (!val) {
      passengerJourney.startJourney(depatureLat, depatureLong);
    } else {
      console.log("🚀 ~ file: passenger.controller.js ~ line 12 ~ passengerJourney ~ else", depatureLat, depatureLong, isFare, isFine)
      passengerJourney.endJourney(depatureLat, depatureLong, isFare, isFine);
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
