import express from 'express';
import { addPhlebotomyReport, getTokenDetails } from '../Controllers/PhlebotomyController.js';
import { getPendingPhlebotomyData, savePendingPhlebotomyData } from '../Controllers/Pendingphelybotny.js';


const router = express.Router();

router.get('/phlebotomy', getTokenDetails);
router.post('/phlebotomy/Report', addPhlebotomyReport)


router.post('/savePendingPhlebotomyData',savePendingPhlebotomyData);
router.get('/savePendingPhlebotomyData',getPendingPhlebotomyData);

export default router;