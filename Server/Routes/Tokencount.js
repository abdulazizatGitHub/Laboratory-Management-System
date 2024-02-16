import express from 'express';
import { getTokenCount, updateTokenCount } from '../Controllers/Tokencount.js';
import { saveToken } from '../Controllers/GenerateToken.js';


const router = express.Router();

router.get('/',getTokenCount);
router.post('/', updateTokenCount); ////Patient registration data
router.post('/',saveToken);

export default router;
