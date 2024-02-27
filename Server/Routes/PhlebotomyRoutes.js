import express from 'express';
import { addPhlebotomyReport, getTokenDetails } from '../Controllers/PhlebotomyController.js';


const router = express.Router();

router.get('/phlebotomy', getTokenDetails);
router.post('/phlebotomy/Report', addPhlebotomyReport)

export default router;