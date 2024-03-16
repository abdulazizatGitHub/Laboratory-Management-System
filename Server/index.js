import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import {connection} from './Connection.js';
import dotenv from 'dotenv';
import Patientdata from './Routes/Patientregistration.js';
import StaffRoutes from './Routes/StaffRoutes.js';
import Addtestroutes from './Routes/Addtest.js';
import GetTest from './Routes/Addtest.js';
import gentok from './Routes/GenerateToken.js';
import logincre from './Routes/Login.js';
import Chanpass from './Routes/Changepassword.js';
import PhlebotomyRoutes from './Routes/PhlebotomyRoutes.js';
// import Forpass from './Routes/Forgotpassword.js';

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

app.use('/images', express.static('images'));

app.use('/receptionist/PatientRegistration', Patientdata);
app.use('/admin', StaffRoutes);
app.use('/admin/Addtest', Addtestroutes);
app.use('/receptionist', GetTest);
app.use('/receptionist/generate_token', gentok);
app.use('/Login', logincre);
app.use('/admin/Change-password', Chanpass);
app.use('/phelobotny', PhlebotomyRoutes);
// app.use('/', Forpass);
