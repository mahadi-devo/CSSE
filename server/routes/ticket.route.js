const express = require("express");
const router = express.Router();
const { createTicket, getTicketInfo, getAllTicketInfo, checkTicketValidity } = require("../controllers/ticket.controller");
const validationMiddleware = require("../middleware/validation.middleware");
const { roleAuthorization } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/auth.middleware");

router.post("/", createTicket);
router.get("/", getAllTicketInfo);
router.get("/:id", getTicketInfo);
router.post("/valid-ticket", checkTicketValidity);

module.exports = router;
