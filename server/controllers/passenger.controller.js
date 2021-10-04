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
    const val = await passengerJourney.findPassengerJourney();
    let data;
    if (val) {
      data = await passengerJourney.passengerJourneyHistory();
    }
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

module.exports = { passengerJourney, passengerJourneyHistory };
