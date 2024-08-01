import mongoose from "mongoose";

const salesSchema = mongoose.Schema({
    user: String,
    date: Date,
    closingNumber: String,
    totalTokens: Number,
    totalAmount: Number,
    remarks: String
});

const salesModel = mongoose.model('Sale', salesSchema);

export default salesModel;