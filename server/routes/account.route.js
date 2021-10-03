const express = require("express");
const router = express.Router();
const { createAccount, createPayment, getAccountInfo, getAllAccountInfo, accountLogin } = require("../controllers/account.controller");
const validationMiddleware = require("../middleware/validation.middleware");
const { roleAuthorization } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/auth.middleware");

router.post("/", createAccount);
router.get("/", getAllAccountInfo);
router.patch("/payment", createPayment);
router.get("/:id", getAccountInfo);

module.exports = router;
