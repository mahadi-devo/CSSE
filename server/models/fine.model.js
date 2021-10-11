const initModels = require("../dao/init-models");
const db = require("../config/db");
const models = initModels(db);
const { getDistance } = require("geolib");

class Fine {
    constructor(inspectionId = null, account = null, amount = null) {
        this.inspectionId = inspectionId;
        this.account = account;
    }

    async createFine(amount, t) {
        try {
            return await db.transaction(async (t) => {
                await models.fine.create({
                    accountId: this.account.id,
                    amount,
                }, { where: { transaction: t } })
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async calculateFineByDistanceForPassenger(passengerHistory, currentLat, currentLong) {
        try {
            const currentDistance = getDistance(
                {
                    latitude: passengerHistory.depatureLat,
                    longitude: passengerHistory.depatureLong,
                },
                {latitude: currentLat, longitude: currentLong}
            )

            const currentDistanceCost = Math.trunc(currentDistance * process.env.FINE_AMOUNT_PER_METER)

            if (this.account.creditAmount < currentDistanceCost) {
                return  currentDistanceCost * 2;
            } else {
                return null;
            }

        } catch (e) {
            throw new Error(e);
        }
    }

    async calculateFineByDistanceForTicket(ticket, currentLat, currentLong) {
        try {
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
                const fineValue = Math.trunc(currentDistance - actualDistance * process.env.FINE_AMOUNT_PER_METER)
                return  { fineValue, currentDistance};
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    calculateFineByTime(validTime) {
        try {
            const currentDateTime = new Date();
            const validDateTime = Date.parse(validTime);
            if (currentDateTime.getTime() > validDateTime) {
                const dif = currentDateTime.getTime() - validDateTime;
                return  Math.trunc(Math.floor((dif / (1000 * 60 * 60)) % 24) * process.env.FINE_AMOUNT_PER_HOUR)
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = Fine;
