const initModels = require("../dao/init-models");
const db = require("../config/db");
const models = initModels(db);
const Passenger = require("../models/passenger.model");
const QRCode = require("qrcode");
const ApiError = require("../utils/apiError");

class Account {
  constructor() {}

  async createAccount(
    creditAmount,
    name,
    nic,
    address,
    passportNo,
    password,
    email
  ) {
    try {
      await db
        .transaction(async (t) => {
          const passenger = new Passenger();
          const passengerObj = await passenger.createPassenger(
            name,
            nic,
            address,
            passportNo
          );
          const account = await models.account.create(
            {
              password,
              email,
              creditAmount,
              passengerId: passengerObj.id,
            },
            { transaction: t }
          );
          passengerObj.dataValues.email = account.email;
          passengerObj.dataValues.creditAmount = account.creditAmount;
          return { account, passengerObj };
        })
        .then(async ({ account, passengerObj }) => {
          QRCode.toDataURL(
            JSON.stringify(passengerObj),
            async function (err, url) {
              await models.account.update(
                {
                  qrCode: url,
                },
                { where: { id: account.id } }
              );
            }
          );
          return passengerObj;
        });
    } catch (e) {
      throw new Error(e);
    }
  }

  async addCredit(amount, accountId) {
    try {
      const account = await models.account.findOne({
        where: { id: accountId },
      });

      if (!account) {
        throw new Error("No account exist");
      }

      await db.transaction(async (t) => {
        await models.account.update(
          {
            creditAmount: (Number(account.creditAmount) + amount).toString(),
          },
          { where: { id: account.id }, transaction: t }
        );
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAccountInfo(accountId) {
    try {
      return models.account.findOne({
        attributes: ["id", "creditAmount", "email", "qrCode"],
        include: {
          model: models.passengers,
          as: "id_passenger",
        },
        where: { id: accountId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllAccountInfo() {
    try {
      return models.account.findAll({
        attributes: ["id", "creditAmount", "email", "qrCode"],
        include: {
          model: models.passengers,
          as: "id_passenger",
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Account;
