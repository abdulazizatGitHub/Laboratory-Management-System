import express from 'express';
import multer from 'multer';
import { getPatientDetails, getStaffDetais, staffRegistration } from '../Controllers/StaffController.js';
import { generateStaffCredentials } from '../Middlewares/StaffCredentials.js';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
import {imageUpload} from "../ImageUpload/imageUpload.js";

router.post("/staff_registration",imageUpload.single("image"),generateStaffCredentials,staffRegistration);
// router.post('/staff_registration', upload.single('image'), generateStaffCredentials, staffRegistration);
router.get('/view-staff-record', getStaffDetais);
router.get('/view-patient-detail', getPatientDetails);


export default router;