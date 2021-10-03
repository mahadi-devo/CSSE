const express = require("express");
const router = express.Router();
const { passengerJourneyStart, passengerJourneyEnd } = require("../controllers/passenger.controller");

router.post("/start", passengerJourneyStart);
router.post("/end", passengerJourneyEnd);

module.exports = router;