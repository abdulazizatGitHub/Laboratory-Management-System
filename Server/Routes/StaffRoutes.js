import express from 'express';
import multer from 'multer';
<<<<<<< Updated upstream
import { getPatientDetails,deletePatData, deleteStaffData, getStaffDetais, staffRegistration } from '../Controllers/StaffController.js';
=======
import { getPatientDetails, deleteStaffData, getStaffDetais, staffRegistration, updateStaff } from '../Controllers/StaffController.js';
>>>>>>> Stashed changes
import { generateStaffCredentials } from '../Middlewares/StaffCredentials.js';
const router = express.Router();
import {imageUpload} from "../ImageUpload/imageUpload.js";

router.post("/staff_registration",imageUpload.single("image"),generateStaffCredentials,staffRegistration);
// router.post('/staff_registration', upload.single('image'), generateStaffCredentials, staffRegistration);
router.get('/view-staff-record', getStaffDetais);
router.get('/view-patient-detail', getPatientDetails);


router.delete("/staffDel/:id", deleteStaffData);
<<<<<<< Updated upstream
router.delete("/patDel/:id", deletePatData);
=======

router.put('/staffDel/:id',updateStaff);
>>>>>>> Stashed changes
export default router;