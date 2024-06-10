import jwt from 'jsonwebtoken';

export const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded; // Attach user to request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};
