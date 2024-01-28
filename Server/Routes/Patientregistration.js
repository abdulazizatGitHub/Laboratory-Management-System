import express from 'express';
import { registerPatient } from '../Controllers/Patientregistration.js';

const router = express.Router();


router.post('/', registerPatient);

export default router;
