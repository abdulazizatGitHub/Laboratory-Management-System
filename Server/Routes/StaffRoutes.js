import express from 'express';
import multer from 'multer';
import { staffRegistration } from '../Controllers/StaffController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/staff_registration', upload.single('image'), staffRegistration);

export default router