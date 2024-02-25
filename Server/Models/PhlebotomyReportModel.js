import mongoose from "mongoose";

const ReportSchema = mongoose.Schema({
    state: String,
    patientDetails: Object,
    report: Object,
    remarks: String,
    generatedBy: String,
    dateTime: String  
});

const ReportModel = mongoose.model('Report', ReportSchema);

export default ReportModel;