const express = require("express");
const router = express.Router();
const { getAllInspectionDetails, getInspectionDetails, getInspectionDetailsByInspector } = require("../controllers/inspection.controller");
const validationMiddleware = require("../middleware/validation.middleware");

router.get("/", getAllInspectionDetails);
router.get("/inspector/:id", getInspectionDetailsByInspector);
router.get("/:id", getInspectionDetails);

module.exports = router;
