const express = require("express");
const router = express.Router();
const { passengerGeton, passengerGetoff } = require("../controllers/passenger.controller");

router.post("/on", passengerGeton);
router.post("/off", passengerGetoff);

module.exports = router;