import express from 'express';
import { getTokenCount, updateTokenCount } from '../Controllers/Tokencount.js';


const router = express.Router();

router.get('/',getTokenCount);
router.put('/', updateTokenCount); ////Patient registration data

export default router;
