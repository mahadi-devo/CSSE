const Inspection = require('../models/inspection.models')

const getAllInspectionDetails = async (req, res, next) => {
    try {
        const inspection = new Inspection();
        const data = await inspection.getAllInspectionDetails();
        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            data: { ...req.body },
        });
    }
};

module.exports = { getAllInspectionDetails };
