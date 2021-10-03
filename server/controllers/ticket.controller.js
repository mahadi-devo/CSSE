const Ticket = require("../models/ticket.model");

const createTicket = async (req, res, next) => {
  try {
    let ticket = new Ticket();
    ticket = ticket.createTicket(
        req.body.price,
        req.body.destinationLong,
        req.body.destinationLat,
        req.body.issuedLocationLat,
        req.body.issuedLocationLong,
        req.body.ticketTypeId,
    );
    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (e) {
    console.log(e);
  }
};

const checkTicketValidity = async (req, res, next) => {
  try {
    let ticket = new Ticket();
    const data = await ticket.checkTicketValidity(req.body.ticketId, req.body.currentLocationLat, req.body.currentLocationLong);
    res.status(200).json({
      data,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const getTicketInfo = async (req, res, next) => {
  try {
    let ticket = new Ticket();
    const data = await ticket.getTicketInfo(req.params.id);
    res.status(200).json({
      data,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const getAllTicketInfo = async (req, res, next) => {
  try {
    let ticket = new Ticket();
    const data = await ticket.getAllTicketInfo();
    res.status(200).json({
      data,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createTicket,
  checkTicketValidity,
  getTicketInfo,
  getAllTicketInfo,
};
