import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    role: { type: String, required: true },
    shift: { type: String, required: true },
    contactNumber: { type: String, required: true },
    cnic: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    image:{
      public_id:{
        type: String,
        required: true
      },
      url:{
        type: String,
        required: true
      }
   },
    userName: {type: String, required: true},
    password: {type: String, required: true},
    resetCode: { type: String }
});

const StaffModel = mongoose.model('Staff', staffSchema);

export default StaffModel;