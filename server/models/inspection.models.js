const initModels = require('../dao/init-models');
const db = require('../config/db');
const models = initModels(db);
const REPORT = require('./report.model');
const REPORTS = require('../common/enum/reports');

class Inspection {
  constructor(
    inspectorId = null,
    currentLat = null,
    currentLong = null,
    journeyId = null
  ) {
    this.inspectorId = inspectorId;
    this.inspectionLat = currentLat;
    this.inspectionLong = currentLong;
    this.journeyId = journeyId;
  }

  async createInspection(t) {
    try {
      return await db.transaction(async (t) => {
        await models.inspection.create(
          {
            inspectorId: this.inspectorId,
            inspectionLat: this.inspectionLat,
            inspectionLong: this.inspectionLong,
            journeyId: this.journeyId,
          },
          { where: { transaction: t } }
        );
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllInspectionDetails() {
    try {
      const inspection = await models.inspection.findAll({
        include: [
          {
            model: models.employee,
            as: 'inspector',
          },
          {
            model: models.journey,
            as: 'journey',
          },
        ],
      });

      // const header = ['Passenger Id','Passenger Name', 'Inspect Location', 'Inspector Name', 'Date Time', 'Fine Amount']
      // let body = []
      // inspection.forEach(inspect => {
      //     const detailsObj = {}
      //     detailsObj.InspectLocation = inspect.inspectionLocation;
      //     detailsObj.Date = inspect.createdAt;
      //     inspect.employee.forEach(employee => {
      //         detailsObj.InspectorName = employee.name;
      //     })
      //     inspect.journey.passengerhistories.forEach(passenger => {
      //         detailsObj.passengerId = passenger.id;
      //         detailsObj.passengerName = passenger.name;
      //         detailsObj.fineAmount = passenger.fine;
      //     })
      //     body.push(detailsObj);
      // })
      // const report = new REPORT(REPORTS.INSPECTION_DETAILS.title, REPORTS.INSPECTION_DETAILS.description, REPORTS.INSPECTION_DETAILS.type);
      // const inspectionDetailsReport = await report.createReport(header, body);

      return { inspection };
    } catch (e) {
      throw new Error(e);
    }
  }

  async getInspectionDetails(id) {
    try {
      const inspection = await models.inspection.findAll({
        include: [
          {
            model: models.employee,
            as: 'inspector',
          },
          {
            model: models.journey,
            as: 'journey',
          },
          {
            model: models.fine,
            as: 'fines',
            include: {
              model: models.passengerhistory,
              as: 'passengerhistories',
              include: {
                model: models.account,
                attributes: ['id','email','creditAmount',],
                as: 'account',
                include: {
                  model: models.passengers,
                  as: 'passenger',
                },
              },
            },
          }
        ],
        where: { id },
      });

    //   const header = [
    //     'Passenger Id',
    //     'Passenger Name',
    //     'Inspect Location',
    //     'Inspector Name',
    //     'Date Time',
    //     'Fine Amount',
    //   ];
    //   let body = [];
    //   inspection.forEach((inspect) => {
    //     const detailsObj = {};
    //     detailsObj.InspectLocation = inspect.inspectionLocation;
    //     detailsObj.Date = inspect.createdAt;
    //     inspect.employee.forEach((employee) => {
    //       detailsObj.InspectorName = employee.name;
    //     });
    //     inspect.journey.passengerhistories.forEach((passenger) => {
    //       detailsObj.passengerId = passenger.id;
    //       detailsObj.passengerName = passenger.name;
    //       detailsObj.fineAmount = passenger.fine;
    //     });
    //     body.push(detailsObj);
    //   });
    //   const report = new REPORT(
    //     REPORTS.INSPECTION_DETAILS.title,
    //     REPORTS.INSPECTION_DETAILS.description,
    //     REPORTS.INSPECTION_DETAILS.type
    //   );
    //   const inspectionDetailsReport = await report.createReport(header, body);

      return { inspection };
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Inspection;
