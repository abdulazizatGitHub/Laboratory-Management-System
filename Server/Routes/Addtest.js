import express from 'express';
import { addTest, getAllTests } from '../Controllers/Addtest.js';


const router = express.Router();


router.post('/', addTest); ////Patient registration data
router.get('/',getAllTests);


export default router;
