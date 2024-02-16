import  express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { connection } from './Connection.js';
import dotenv from 'dotenv';
import Patientdata from './Routes/Patientregistration.js';
import StaffRoutes from './Routes/StaffRoutes.js';
import Addtestroutes from './Routes/Addtest.js';
import Tokenroute from './Routes/Tokencount.js';

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

app.use('/PatientRegistration',Patientdata); //Patient Registration 
app.use('/admin', StaffRoutes);
app.use('/admin/Addtest',Addtestroutes);
app.use('/receptionist/generate_token',Tokenroute);