import express from 'express';
import { saveToken } from '../Controllers/GenerateToken.js';


const router = express.Router();

router.post('/',saveToken);


export default router;
