import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.MONGODB_URL;

const connection = mongoose.connect(apiKey);
export { connection };
