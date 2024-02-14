import express from 'express';
import multer from 'multer';
import { staffRegistration } from '../Controllers/StaffController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/staffRegistration', upload.single('image'), staffRegistration);

export default router