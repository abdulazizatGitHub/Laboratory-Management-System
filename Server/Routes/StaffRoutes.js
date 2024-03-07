import express from 'express';
import multer from 'multer';
import { getPatientDetails,deletePatData, deleteStaffData, getStaffDetais, staffRegistration , updateStaff, updatePatient, getStaffDetailsByRole } from '../Controllers/StaffController.js';
import {imageUpload} from "../ImageUpload/imageUpload.js";
import { generateStaffCredentials } from '../Middlewares/StaffCredentials.js';


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Images/');
      },
    filename:function (req ,file, cb){
        cb(null , Date.now() + '-' + file.originalname);
    },
});

const upload= multer({
    storage : storage,
    limits: {
        fieldSize: 1024 * 1024 * 100,
    },
});


router.post("/staff_registration",upload.single("image"),generateStaffCredentials,staffRegistration);
// router.post('/staff_registration', upload.single('image'), generateStaffCredentials, staffRegistration);
router.get('/view-staff-record', getStaffDetais);
router.get('/view-patient-detail', getPatientDetails);
router.get('/staff_report', getStaffDetailsByRole);


router.delete("/staffDel/:id", deleteStaffData);
router.delete("/patDel/:id", deletePatData);

router.put('/staffDel/:id',updateStaff);
router.put('/patDel/:id',updatePatient);

export default router;