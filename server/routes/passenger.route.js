const express = require("express");
const router = express.Router();
const { passengerJourney, passengerJourneyHistory } = require("../controllers/passenger.controller");

router.post("/journey", passengerJourney);
router.get("/journeyHistory/:accountId", passengerJourneyHistory);

module.exports = router;