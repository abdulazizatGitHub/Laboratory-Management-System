import express from 'express';
import { getTokenDetails } from '../Controllers/PhlebotomyController.js';


const router = express.Router();

router.get('/phlebotomy', getTokenDetails);

export default router;