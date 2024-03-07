import express from 'express';
import multer from 'multer';
import { getPatientDetails,deletePatData, deleteStaffData, getStaffDetais, staffRegistration , updateStaff, updatePatient, getStaffDetailsByRole } from '../Controllers/StaffController.js';
import {imageUpload} from "../ImageUpload/imageUpload.js";
import { generateStaffCredentials } from '../Middlewares/StaffCredentials.js';


const router = express.Router();


router.post("/staff_registration",imageUpload.single("image"),generateStaffCredentials,staffRegistration);
// router.post('/staff_registration', upload.single('image'), generateStaffCredentials, staffRegistration);
router.get('/view-staff-record', getStaffDetais);
router.get('/view-patient-detail', getPatientDetails);
router.get('/staff_report', getStaffDetailsByRole);


router.delete("/staffDel/:id", deleteStaffData);
router.delete("/patDel/:id", deletePatData);

router.put('/staffDel/:id',updateStaff);
router.put('/patDel/:id',updatePatient);

export default router;