const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/account.controller");
const validationMiddleware = require("../middleware/validation.middleware");

router.post("/", getAllInspectionDetails);

module.exports = router;
