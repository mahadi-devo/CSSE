const initModels = require("../dao/init-models");
const db = require("../config/db");
const Account_Type = require("../common/enum/accountTypes");
const models = initModels(db);
const Passenger = require("./passenger.model");
const QRCode = require("qrcode");
const bcrypt = require("bcryptjs");
const Status = require("../common/enum/ticketStatus");
const Fine = require("./fine.model");
const Inspection = require("./inspection.models");

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
          passengerObj.dataValues.accountId = account.id;
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

  async addCredit(amount, accountId, paymentMethodId) {
    try {
      const account = await models.account.findOne({
        where: { id: accountId },
      });

      if (!account) {
        throw new Error("No account exist");
      }

      await db.transaction(async (t) => {
        await models.payment.create({
          paymentMethodId,
          accountId: account.id,
          amount,
        }, { transaction: t })
        await models.account.update(
          {
            creditAmount: (Number(account.creditAmount) + Number(amount)).toString(),
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
          as: "passenger",
        },
        where: { id: accountId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllAccountInfo() {
    try {
      return await models.account.findAll({
        attributes: ["id", "creditAmount", "email", "qrCode"],
        include: {
          model: models.passengers,
          as: "passenger",
        },
        where: { accountTypeId: Account_Type.Passenger }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async accountLogin(email, password) {
    try {
      const account = await models.account.findOne({
        where: { email },
      });

      if (!account) {
        throw new Error("No account exist");
      }

      if (!(await bcrypt.compare(password, account.password))) {
        throw new Error("Password does not match with the email");
      }

      const options = {
        attributes: ["id", "creditAmount", "email", "qrCode", "accountTypeId"],
        include: {
          model: models.passengers,
          as: "passenger",
          where: { id: account.passengerId }
        },
        where: { id: account.id },
      }

      if (account.accountTypeId === Account_Type.Employee) {
        options.include = {
          model: models.employee,
          as: "employee",
          where: { id: account.employeeId }
        }
      }
      return await models.account.findOne(options);
    } catch (e) {
      throw new Error(e);
    }
  }

  async checkAccountValidity(passengerId, inspectorId, currentLat = null, currentLong = null) {
    try {
      const passenger = await models.account.findOne({
        where: {id: passengerId},
      });

      const inspector = await models.account.findOne({
        where: {id: inspectorId},
      });

      if (!passenger) {
        throw new Error("No Passenger Account Exist");
      }

      if (!inspector) {
        throw new Error("No Inspector Account Exist");
      }

      const passengerHistory = await models.passengerhistory.findOne({
        where: {accountId: passenger.id}
      })

      const fine = new Fine(inspector.id, passenger);
      const inspection = new Inspection(inspector.employeeId, currentLat, currentLong, passengerHistory.journeyId)
      const fineAmount = await fine.calculateFineByDistanceForPassenger(passengerHistory, currentLat, currentLong);

      await db.transaction(async (t) => {
        await inspection.createInspection(t);
        if (fineAmount) {
          await fine.createFine(fineAmount, t)
          await models.account.update(
              {
                creditAmount: `${(fine - Number(passenger.creditAmount))}`,
              },
              { where: { id: passenger.id }, transaction: t }
          );
          await models.passengerhistory.update(
              {
                fineId: fine.id,
              },
              { where: { accountId: passenger.id }, transaction: t }
          );
        }
      });

      if (fineAmount) {
        return {
          status: Status.Invalid,
          fine: fineAmount
        };
      } else {
        return {
          status: Status.Valid,
          fine: null
        };
      }

    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Account;
