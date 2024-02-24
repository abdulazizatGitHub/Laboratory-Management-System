import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers['Authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is required.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRETKEY); // Extract token value from the "Bearer <token>" format
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default verifyToken;
