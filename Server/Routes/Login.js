// Routes/StaffRoutes.js

import express from 'express';
import { login } from '../Controllers/StaffController.js';
import verifyToken from '../Middlewares/Verifytoken.js';


const router = express.Router();

// Route to handle login
router.post('/', login);

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  // Access user information from the request object
  const user = req.user;
  res.json({ message: 'Access granted.', user });
});

export default router;
