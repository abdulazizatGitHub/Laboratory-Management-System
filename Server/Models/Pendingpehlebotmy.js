import mongoose from "mongoose";

// Define schema for pending phlebotomy data
const PendingPhlebotomySchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    generatedBy: {
        type: String,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    patientData: {
        type: Object,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    tests: {
        type: Array,
        required: true
    },
    tokenNumber: {
        type: String,
        required: true
    }
});

// Create model for pending phlebotomy data
const PendingPhlebotomy = mongoose.model('PendingPhlebotomy', PendingPhlebotomySchema);

export default PendingPhlebotomy;
