import express from 'express';
import { registerPatient } from '../Controllers/Patientregistration.js';

const router = express.Router();


router.post('/', registerPatient); ////Patient registration data

export default router;
