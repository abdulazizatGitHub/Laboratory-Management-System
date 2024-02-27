import express from 'express';
import { addTest, getAllTestReportDetails, getAllTests, getTestReportDetails } from '../Controllers/Addtest.js';


const router = express.Router();


router.post('/', addTest); ////Patient registration data
router.get('/',getAllTests);
router.get('/view_test_report', getTestReportDetails);
router.get('/search_test_report', getAllTestReportDetails);

export default router;
