const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/account.controll");
const validationMiddleware = require("../middleware/validation.middleware");
const { roleAuthorization } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/auth.middleware");

router.post("/", createAccount);

module.exports = router;
