const express = require("express");
const router = express.Router();
const { createAccount, createPayment, getAccountInfo, getAllAccountInfo, checkAccountValidity } = require("../controllers/account.controller");
const validationMiddleware = require("../middleware/validation.middleware");

router.post("/", createAccount);
router.get("/", getAllAccountInfo);
router.patch("/payment", createPayment);
router.get("/:id", getAccountInfo);
router.post("/valid-account", checkAccountValidity);

module.exports = router;
