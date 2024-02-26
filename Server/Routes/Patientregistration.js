import express from 'express';
import { getPatientCount, registerPatient } from '../Controllers/Patientregistration.js';
import generatePinMiddleware from '../Middlewares/GeneratePin.js';
const router = express.Router();


router.post('/', registerPatient); ////Patient registration data
router.get('/',getPatientCount);

export default router;
