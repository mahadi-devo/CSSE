const express = require("express");
const router = express.Router();
const { getAllInspectionDetails, getInspectionDetails } = require("../controllers/inspection.controller");
const validationMiddleware = require("../middleware/validation.middleware");

router.post("/", getAllInspectionDetails);
router.post("/:accountId", getInspectionDetails);

module.exports = router;
