const PassengerJourney = require('../models/passengerJourney.model');

const passengerJourney = async (req, res, next) => {
  try {
    const { accountId, journeyId, depatureLat, depatureLong, isFare, isFine } =
      req.body;
    console.log(
      '🚀 ~ file: passenger.controller.js ~ line 7 ~ passengerJourney ~ req.body',
      req.body
    );
    const passengerJourney = new PassengerJourney(accountId, journeyId);
    const val = await passengerJourney.findPassengerJourney();
    if (!val) {
      passengerJourney.startJourney(depatureLat, depatureLong);
    } else {
      console.log(
        '🚀 ~ file: passenger.controller.js ~ line 12 ~ passengerJourney ~ else',
        depatureLat,
        depatureLong,
        isFare,
        isFine
      );
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

const passengerJourneyHistoryByAccountId = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const passengerJourney = new PassengerJourney(accountId, null);
    const data = await passengerJourney.getPassengerJourneyByAccountId();
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

const passengerJourneyByJourneyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const passengerJourney = new PassengerJourney(null, null);
    const data = await passengerJourney.getPassengerJourneyByJourneyId(id);
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

module.exports = {
  passengerJourney,
  passengerJourneyHistoryByAccountId,
  getAllPassengerJourneyHistory,
  passengerJourneyByJourneyId,
};
