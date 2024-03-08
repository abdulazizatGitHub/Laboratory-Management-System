import express from 'express';
import { addPhlebotomyReport, getTokenDetails, updateReport } from '../Controllers/PhlebotomyController.js';


const router = express.Router();

router.get('/phlebotomy', getTokenDetails);
router.post('/phlebotomy/Report', addPhlebotomyReport)

router.put('/phlebotomy/:id', updateReport);

export default router;