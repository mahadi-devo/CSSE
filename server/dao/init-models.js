var { DataTypes, Op } = require("sequelize");
var _account = require("./account");
var _accounttype = require("./accounttype");
var _bus = require("./bus");
var _employee = require("./employee");
var _employeetype = require("./employeetype");
var _fare = require("./fare");
var _fine = require("./fine");
var _inspection = require("./inspection");
var _journey = require("./journey");
var _passengerhistory = require("./passengerhistory");
var _passengers = require("./passengers");
var _payment = require("./payment");
var _paymentmethod = require("./paymentmethod");
var _report = require("./report");
var _reporttype = require("./reporttype");
var _route = require("./route");
var _ticket = require("./ticket");
var _tickettype = require("./tickettype");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var accounttype = _accounttype(sequelize, DataTypes);
  var bus = _bus(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var employeetype = _employeetype(sequelize, DataTypes);
  var fare = _fare(sequelize, DataTypes);
  var fine = _fine(sequelize, DataTypes);
  var inspection = _inspection(sequelize, DataTypes);
  var journey = _journey(sequelize, DataTypes);
  var passengerhistory = _passengerhistory(sequelize, DataTypes);
  var passengers = _passengers(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var paymentmethod = _paymentmethod(sequelize, DataTypes);
  var report = _report(sequelize, DataTypes);
  var reporttype = _reporttype(sequelize, DataTypes);
  var route = _route(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var tickettype = _tickettype(sequelize, DataTypes);

  fine.belongsTo(account, { as: "account", foreignKey: "accountId"});
  account.hasMany(fine, { as: "fines", foreignKey: "accountId"});
  passengerhistory.belongsTo(account, { as: "account", foreignKey: "accountId"});
  account.hasMany(passengerhistory, { as: "passengerhistories", foreignKey: "accountId"});
  payment.belongsTo(account, { as: "account", foreignKey: "accountId"});
  account.hasMany(payment, { as: "payments", foreignKey: "accountId"});
  account.belongsTo(accounttype, { as: "accountType", foreignKey: "accountTypeId"});
  accounttype.hasMany(account, { as: "accounts", foreignKey: "accountTypeId"});
  journey.belongsTo(bus, { as: "bus", foreignKey: "busId"});
  bus.hasMany(journey, { as: "journeys", foreignKey: "busId"});
  account.belongsTo(employee, { as: "employee", foreignKey: "employeeId"});
  employee.hasMany(account, { as: "accounts", foreignKey: "employeeId"});
  inspection.belongsTo(employee, { as: "inspector", foreignKey: "inspectorId"});
  employee.hasMany(inspection, { as: "inspections", foreignKey: "inspectorId"});
  employee.belongsTo(employeetype, { as: "employeeType", foreignKey: "employeeTypeId"});
  employeetype.hasMany(employee, { as: "employees", foreignKey: "employeeTypeId"});
  passengerhistory.belongsTo(fine, { as: "fine", foreignKey: "fineId"});
  fine.hasMany(passengerhistory, { as: "passengerhistories", foreignKey: "fineId"});
  fine.belongsTo(inspection, { as: "inspection", foreignKey: "inspectionId"});
  inspection.hasMany(fine, { as: "fines", foreignKey: "inspectionId"});
  fare.belongsTo(journey, { as: "journey", foreignKey: "journeyId"});
  journey.hasMany(fare, { as: "fares", foreignKey: "journeyId"});
  inspection.belongsTo(journey, { as: "journey", foreignKey: "journeyId"});
  journey.hasMany(inspection, { as: "inspections", foreignKey: "journeyId"});
  passengerhistory.belongsTo(journey, { as: "journey", foreignKey: "journeyId"});
  journey.hasMany(passengerhistory, { as: "passengerhistories", foreignKey: "journeyId"});
  account.belongsTo(passengers, { as: "passenger", foreignKey: "passengerId"});
  passengers.hasMany(account, { as: "accounts", foreignKey: "passengerId"});
  payment.belongsTo(paymentmethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
  paymentmethod.hasMany(payment, { as: "payments", foreignKey: "paymentMethodId"});
  report.belongsTo(reporttype, { as: "reportType", foreignKey: "reportTypeId"});
  reporttype.hasMany(report, { as: "reports", foreignKey: "reportTypeId"});
  journey.belongsTo(route, { as: "route", foreignKey: "routeId"});
  route.hasMany(journey, { as: "journeys", foreignKey: "routeId"});
  ticket.belongsTo(tickettype, { as: "ticketType", foreignKey: "ticketTypeId"});
  tickettype.hasMany(ticket, { as: "tickets", foreignKey: "ticketTypeId"});
  passengerhistory.belongsTo(fare, { as: "fare", foreignKey: "fareId"});
  fare.hasMany(passengerhistory, { as: "passengerhistories", foreignKey: "fareId"});

  return {
    account,
    accounttype,
    bus,
    employee,
    employeetype,
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
