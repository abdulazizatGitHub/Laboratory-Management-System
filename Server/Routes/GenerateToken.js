import express from 'express';
import { saveToken,getGeneratedToken,updateToken } from '../Controllers/GenerateToken.js';


const router = express.Router();

router.post('/',saveToken);
router.get('/',getGeneratedToken);
router.put('/:id', updateToken);

export default router;
