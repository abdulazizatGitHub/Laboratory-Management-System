// models/Token.js

import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0
  }
});

const Tokencount = mongoose.model('Token', tokenSchema);

export default Tokencount;
