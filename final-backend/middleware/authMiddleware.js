import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
};
