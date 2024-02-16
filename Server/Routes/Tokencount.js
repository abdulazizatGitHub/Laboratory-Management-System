import express from 'express';
import { getTokenCount, updateTokenCount } from '../Controllers/Tokencount.js';
import { saveToken } from '../Controllers/GenerateToken.js';


const router = express.Router();

router.get('/',getTokenCount);
router.post('/',saveToken);
router.post('/', updateTokenCount); ////Patient registration data

export default router;
