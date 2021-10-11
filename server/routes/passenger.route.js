const express = require("express");
const router = express.Router();
const { passengerJourney, passengerJourneyHistoryByAccountId, getAllPassengerJourneyHistory, passengerJourneyByJourneyId } = require("../controllers/passenger.controller");

router.post("/journey", passengerJourney);
router.get("/journey/:id", passengerJourneyByJourneyId);
router.get("/journey/account/:accountId", passengerJourneyHistoryByAccountId);
router.get("/getAllJourneyDetails", getAllPassengerJourneyHistory);

module.exports = router;
