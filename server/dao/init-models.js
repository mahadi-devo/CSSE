const { DataTypes, Op }= require("sequelize")
const _account = require("./account");
const _bus = require("./bus");
const _employee = require("./employee");
const _fare = require("./fare");
const _fine = require("./fine");
const _inspection = require("./inspection");
const _journey = require("./journey");
const _passengerhistory = require("./passengerhistory");
const _passengers = require("./passengers");
const _payment = require("./payment");
const _paymentmethod = require("./paymentmethod");
const _report = require("./report");
const _reporttype = require("./reporttype");
const _route = require("./route");
const _ticket = require("./ticket");
const _tickettype = require("./tickettype");
const _accounttype = require("./accounttype");
const _employeetype = require("./employeetype");

function initModels(sequelize) {
  const account = _account(sequelize, DataTypes);
  const bus = _bus(sequelize, DataTypes);
  const employee = _employee(sequelize, DataTypes);
  const fare = _fare(sequelize, DataTypes);
  const fine = _fine(sequelize, DataTypes);
  const inspection = _inspection(sequelize, DataTypes);
  const journey = _journey(sequelize, DataTypes);
  const passengerhistory = _passengerhistory(sequelize, DataTypes);
  const passengers = _passengers(sequelize, DataTypes);
  const payment = _payment(sequelize, DataTypes);
  const paymentmethod = _paymentmethod(sequelize, DataTypes);
  const report = _report(sequelize, DataTypes);
  const reporttype = _reporttype(sequelize, DataTypes);
  const route = _route(sequelize, DataTypes);
  const ticket = _ticket(sequelize, DataTypes);
  const tickettype = _tickettype(sequelize, DataTypes);
  const accounttype = _accounttype(sequelize, DataTypes);
  const employeetype = _employeetype(sequelize, DataTypes);

  fine.belongsTo(account, { as: "account", foreignKey: "accountId"});
  account.hasMany(fine, { as: "fines", foreignKey: "accountId"});
  journey.belongsTo(bus, { as: "bus", foreignKey: "busId"});
  bus.hasMany(journey, { as: "journeys", foreignKey: "busId"});
  inspection.belongsTo(employee, { as: "inspector", foreignKey: "inspectorId"});
  employee.hasMany(inspection, { as: "inspections", foreignKey: "inspectorId"});
  employee.belongsTo(employeetype, { as: "employeeType", foreignKey: "employeeTypeId"});
  employeetype.hasMany(employee, { as: "employees", foreignKey: "employeeTypeId"});
  fine.belongsTo(inspection, { as: "inspection", foreignKey: "inspectionId"});
  inspection.hasMany(fine, { as: "fines", foreignKey: "inspectionId"});
  fare.belongsTo(journey, { as: "journey", foreignKey: "journeyId"});
  journey.hasMany(fare, { as: "fares", foreignKey: "journeyId"});
  inspection.belongsTo(journey, { as: "journey", foreignKey: "journeyId"});
  journey.hasMany(inspection, { as: "inspections", foreignKey: "journeyId"});
  fare.belongsTo(passengerhistory, { as: "passengerHistory", foreignKey: "passengerHistoryId"});
  passengerhistory.hasMany(fare, { as: "fares", foreignKey: "passengerHistoryId"});
  account.belongsTo(passengers, { as: "id_passenger", foreignKey: "id"});
  passengers.hasOne(account, { as: "account", foreignKey: "id"});
  account.belongsTo(accounttype, { as: "accountType", foreignKey: "accountTypeId"});
  accounttype.hasMany(account, { as: "accounts", foreignKey: "accountTypeId"});
  account.belongsTo(employee, { as: "employee", foreignKey: "employeeId"});
  employee.hasMany(account, { as: "accounts", foreignKey: "employeeId"});
  payment.belongsTo(paymentmethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
  paymentmethod.hasMany(payment, { as: "payments", foreignKey: "paymentMethodId"});
  payment.belongsTo(account, { as: "account", foreignKey: "accountId"});
  account.hasMany(payment, { as: "payments", foreignKey: "accountId"});
  report.belongsTo(reporttype, { as: "reportType", foreignKey: "reportTypeId"});
  reporttype.hasMany(report, { as: "reports", foreignKey: "reportTypeId"});
  journey.belongsTo(route, { as: "route", foreignKey: "routeId"});
  route.hasMany(journey, { as: "journeys", foreignKey: "routeId"});
  ticket.belongsTo(tickettype, { as: "tickettype", foreignKey: "tickettypeId"});
  tickettype.hasMany(ticket, { as: "tickets", foreignKey: "tickettypeId"});
  passengerhistory.belongsTo(journey, { as: "journey", foreignKey: "journeyId"});
  journey.hasMany(passengerhistory, { as: "passengerhistories", foreignKey: "journeyId"});

  return {
    account,
    bus,
    employee,
    fare,
    fine,
    inspection,
    journey,
    passengerhistory,
    passengers,
    payment,
    paymentmethod,
    report,
    reporttype,
    route,
    ticket,
    tickettype,
    Op,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
