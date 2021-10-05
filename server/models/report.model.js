const initModels = require("../dao/init-models");
const db = require("../config/db");
const models = initModels(db);

class Report {
    constructor(name, description, reportTypeId) {
        this.name = name;
        this.description = description;
        this.reportTypeId = reportTypeId;

    }

    async createReport(header, body) {
        const report = models.report.create({
            name: this.name,
            description: this.description,
            reportTypeId: this.reportTypeId,
        })
        return await generatePdf(report.id,this.name, header, body)
    }
}

module.exports = Report;
