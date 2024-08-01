import express from 'express';
import { saveToken,getGeneratedToken,updateToken, getSales } from '../Controllers/GenerateToken.js';


const router = express.Router();

router.post('/',saveToken);
router.get('/',getGeneratedToken);
router.put('/:id', updateToken);
router.get('/checkout', getSales);

export default router;
