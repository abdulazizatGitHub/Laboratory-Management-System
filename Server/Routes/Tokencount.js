import express from 'express';
import { getTokenCount, updateTokenCount } from '../Controllers/Tokencount.js';


const router = express.Router();

router.get('/',getTokenCount);
router.post('/', updateTokenCount); ////Patient registration data

export default router;
