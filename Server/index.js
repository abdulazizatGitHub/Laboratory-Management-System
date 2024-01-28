import  express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import Patientdata from './Routes/Patientregistration.js';
import { connection } from './Connection.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

connection.then(() => {
  console.log("Connection successful");
}).catch((error) => {
  console.log("Connection Error", error);
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/PatientRegistration',Patientdata);