import mongoose from "mongoose";

const ReportSchema = mongoose.Schema({
    state: String,
    patientDetails: Object,
    report: Array,
    remarks: String,
    generatedBy: String,
    dateTime: String  
});

const PhlebotomyReportModel = mongoose.model('Report', ReportSchema);

export default PhlebotomyReportModel;