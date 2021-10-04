const initModels = require("../dao/init-models");
const db = require("../config/db");
const models = initModels(db);
const TicketType = require("../common/enum/ticketTypes");
const Ticket_Status = require("../common/enum/ticketStatus");
const QRCode = require("qrcode");
const { getDistance, convertDistance } = require("geolib");

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
    // destinationLat = 6.672834;
    // destinationLong = 80.396576;

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

  async checkTicketValidity(ticketId, currentLat = null, currentLong = null) {
    try {
      const ticket = await models.ticket.findOne({
        where: { id: ticketId },
      });

      if (!ticket) {
        throw new Error("No ticket exist");
      }

      if (ticket.ticketTypeId === TicketType.One_Way_Ticket) {
        const actualDistance = getDistance(
          {
            latitude: ticket.issuedLocationLat,
            longitude: ticket.issuedLocationLong,
          },
          { latitude: ticket.destinationLat, longitude: ticket.destinationLong }
        );

        const currentDistance = getDistance(
          {
            latitude: ticket.issuedLocationLat,
            longitude: ticket.issuedLocationLong,
          },
          { latitude: currentLat, longitude: currentLong }
        );

        if (currentDistance > actualDistance) {
          const dif = currentDistance - actualDistance
          return {
            status: Ticket_Status.Invalid,
            distance: convertDistance(currentDistance, "m"),
            fine:  Math.trunc(dif * process.env.FINE_AMOUNT_PER_METER),
          };
        } else {
          return {
            status: Ticket_Status.Valid,
            distance: convertDistance(currentDistance, "m"),
          };
        }
      } else if (
        ticket.ticketTypeId === TicketType.Day_Use_Ticket ||
        ticket.ticketTypeId === TicketType.Pay_As_You_Go_Ticket
      ) {
        const currentDateTime = new Date();
        const validDateTime = Date.parse(ticket.validityPeriod);

        if (currentDateTime.getTime() > validDateTime) {
          const dif = currentDateTime.getTime() - validDateTime;
          return {
            status: Ticket_Status.Invalid,
            fine: Math.trunc(Math.floor((dif / (1000 * 60 * 60)) % 24) * process.env.FINE_AMOUNT_PER_HOUR),
          };
        } else {
          return {
            status: Ticket_Status.Valid,
          };
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Ticket;
