import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  cnic: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String },
  refDoctor: { type: String },
  internalRemarks: { type: String },
  patientRemarks: { type: String },
  pin: {type: String},
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
