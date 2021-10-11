const express = require("express");
const router = express.Router();
const { getAllInspectionDetails, getInspectionDetails } = require("../controllers/inspection.controller");
const validationMiddleware = require("../middleware/validation.middleware");

router.get("/", getAllInspectionDetails);
router.get("/:id", getInspectionDetails);

module.exports = router;
