import express from 'express';
import { saveToken,getGeneratedToken } from '../Controllers/GenerateToken.js';


const router = express.Router();

router.post('/',saveToken);
router.get('/',getGeneratedToken);


export default router;
