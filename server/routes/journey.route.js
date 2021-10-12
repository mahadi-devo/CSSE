const express = require("express");
const router = express.Router();
const { createJourney, getJourney, getAllJourney, endJourny } = require("../controllers/journey.controller");

router.post("/", createJourney);
router.put("/", endJourny);
router.get("/:journeyId", getJourney);
router.get("/", getAllJourney);

module.exports = router;