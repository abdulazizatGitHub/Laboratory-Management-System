import mongoose from 'mongoose';

const { Schema } = mongoose;

const testSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  section: { type: String, required: true },
  sampleType: { type: String, required: true },
  sampleQuantity: { type: String, required: true },
  unit: { type: String, required: true },
  normalRange: {
    male: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    female: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
  },
});

const Test = mongoose.model('Test', testSchema);

export default Test;
