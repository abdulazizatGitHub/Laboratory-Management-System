// Import necessary modules and dependencies
import mongoose from 'mongoose'; // Import Mongoose
const { Schema } = mongoose;

// Define the schema for the token
const tokenSchema = new Schema({
  
  tokenNumber: String,
  patientData: Object, // Assuming patientData is an object
  tests: [Object], // Assuming tests is an array of objects
  grandTotal: Number,
  dateTime: String,
  generatedBy: String,
  state: String,
  remark: String
});

// Create the Token model
const GenToken = mongoose.model('Generatetoken', tokenSchema);

// Export the Token model
export default GenToken;
