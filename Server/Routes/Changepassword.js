import express from 'express';
import { changePassword } from '../Controllers/StaffController.js';



const router = express.Router();

router.put('/',changePassword);


export default router;
