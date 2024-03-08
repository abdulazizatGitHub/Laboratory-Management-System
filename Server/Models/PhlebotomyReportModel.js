import mongoose from "mongoose";

const ReportSchema = mongoose.Schema({
    tokenNumber:String,
    state: String,
    patientDetails: Object,
    report: Array,
    remarks: String,
    generatedBy: String,
    dateTime: String,
    time: String
});

const PhlebotomyReportModel = mongoose.model('Report', ReportSchema);

export default PhlebotomyReportModel;