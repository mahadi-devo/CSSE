const initModels = require("../dao/init-models");
const db = require("../config/db");
const models = initModels(db);
const TicketType = require("../common/enum/ticketTypes");
const Ticket_Status = require("../common/enum/ticketStatus");
const QRCode = require("qrcode");
const { convertDistance } = require("geolib");
const Fine = require("./fine.model");
const Inspection = require("./inspection.models");

class Ticket {
  constructor() {}

  async createTicket(
    price,
    destinationLong,
    destinationLat,
    issuedLocationLat,
    issuedLocationLong,
    ticketTypeId
  ) {
    let validityPeriod;
    if (TicketType.Day_Use_Ticket) {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      validityPeriod = new Date(date).toISOString();
    } else {
      let date = new Date();
      date.setDate(date.getDate() + 30);
      validityPeriod = new Date(date).toISOString();
    }

    try {
      await db
        .transaction(async (t) => {
          return await models.ticket.create(
            {
              price,
              destinationLong,
              destinationLat,
              issuedLocationLat,
              issuedLocationLong,
              ticketTypeId,
              validityPeriod,
            },

            { transaction: t }
          );
        })
        .then(async (ticket) => {
          QRCode.toDataURL(JSON.stringify(ticket), async function (err, url) {
            await models.ticket.update(
              {
                qrCode: url,
              },
              { where: { id: ticket.id } }
            );
          });
          return ticket;
        });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTicketInfo(ticketId) {
    try {
      return await models.ticket.findOne({ where: { id: ticketId } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllTicketInfo() {
    try {
      return await models.ticket.findAll();
    } catch (e) {
      throw new Error(e);
    }
  }

  async checkTicketValidity(inspectorId, ticketId, currentLat = null, currentLong = null) {
    try {
      const ticket = await models.ticket.findOne({
        where: {id: ticketId},
      });

      if (!ticket) {
        throw new Error("No ticket exist");
      }
      let ticketStatus;
      const fine = new Fine();
      const inspection = new Inspection(inspectorId, currentLat, currentLong)
      await db.transaction(async (t) => {
        await inspection.createInspection(t)
      });
      if (ticket.ticketTypeId === TicketType.One_Way_Ticket) {

        const {fineValue, currentDistance} = fine.calculateFineByDistanceForTicket(ticket, currentLat, currentLong);

        if (fineValue) {
          ticketStatus = {
            status: Ticket_Status.Invalid,
            distance: convertDistance(currentDistance, "m"),
            fine: fineValue,
          }
          await  fine.createFine(ticketStatus.fine)
          } else {
            ticketStatus = {
              status: Ticket_Status.Valid,
              distance: convertDistance(currentDistance, "m"),
            }
        }
      } else if (
        ticket.ticketTypeId === TicketType.Day_Use_Ticket ||
        ticket.ticketTypeId === TicketType.Pay_As_You_Go_Ticket
      ) {
        const fineValue = fine.calculateFineByTime(ticket.validityPeriod);

        if (fineValue) {
          ticketStatus = {
            status: Ticket_Status.Invalid,
            fine: fineValue,
          };
          await  fine.createFine(ticketStatus.fine)
        } else {
          ticketStatus = {
            status: Ticket_Status.Valid,
          };
        }
      }

      return ticketStatus;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Ticket;
