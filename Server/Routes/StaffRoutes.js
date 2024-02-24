import express from 'express';
import multer from 'multer';
import { getPatientDetails, deleteStaffData, getStaffDetais, staffRegistration } from '../Controllers/StaffController.js';
import { generateStaffCredentials } from '../Middlewares/StaffCredentials.js';
const router = express.Router();
import {imageUpload} from "../ImageUpload/imageUpload.js";

router.post("/staff_registration",imageUpload.single("image"),generateStaffCredentials,staffRegistration);
// router.post('/staff_registration', upload.single('image'), generateStaffCredentials, staffRegistration);
router.get('/view-staff-record', getStaffDetais);
router.get('/view-patient-detail', getPatientDetails);


router.delete("/staffDel/:id", deleteStaffData);
export default router;