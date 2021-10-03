const express = require("express");
const router = express.Router();
const { createJourney, getJourney, getAllJourney } = require("../controllers/journey.controller");

router.post("/", createJourney);
router.get("/:journeyId", getJourney);
router.get("/", getAllJourney);

module.exports = router;