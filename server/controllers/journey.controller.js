const Journey = require('../models/journey.model');

const createJourney = async (req, res, next) => {
  try {
    const { busId, routeId } = req.body;
    
    let journey = new Journey(busId, routeId);

    await journey.createJourny();

    res.status(200).json({
      success: true,
      data: journey,
    });
  } catch (e) {
    console.log(e);
  }
};

const getJourney = async (req, res, next) => {
  try {
    const { journeyId } = req.params;
    let journey = new Journey();

    const journeyOjct = await journey.getJourny(journeyId);

    res.status(200).json({
      success: true,
      data: journeyOjct,
    });
  } catch (e) {
    console.log(e);
  }
};

const getAllJourney = async (req, res, next) => {
  try {
    let journey = new Journey();
    
    console.log("🚀 ~ file: journey.controller.js ~ line 50 ~ getAllJourney ~ getAllJourney", journey)

    const allJourneyOjct = await journey.getAllJourny();

    res.status(200).json({
      success: true,
      data: allJourneyOjct,
    });
  } catch (e) {
    console.log(e);
  }
};

const endJourny = async (req, res, next) => {
  try {
    const { busId, routeId } = req.body;
    
    let journey = new Journey(busId, routeId);

    await journey.endJourny();

    res.status(200).json({
      success: true,
      data: journey,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createJourney, getJourney, getAllJourney, endJourny };
