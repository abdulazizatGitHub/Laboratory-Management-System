import express from 'express';
import { saveToken,getGeneratedToken,updateToken, getSales, addSalesData } from '../Controllers/GenerateToken.js';


const router = express.Router();

router.post('/',saveToken);
router.get('/',getGeneratedToken);
router.put('/:id', updateToken);
router.get('/checkout', getSales);
router.post('/checkout', addSalesData)

export default router;
