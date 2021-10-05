const express = require("express");
const router = express.Router();
const { passengerJourney, passengerJourneyHistory, getAllPassengerJourneyHistory } = require("../controllers/passenger.controller");

router.post("/journey", passengerJourney);
router.get("/journeyDetails/:accountId", passengerJourneyHistory);
router.get("/getAllJourneyDetails", getAllPassengerJourneyHistory);

module.exports = router;
