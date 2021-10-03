const express = require("express");
const router = express.Router();
const { accountLogin } = require("../controllers/account.controller");

router.post("/login", accountLogin);

module.exports = router;
