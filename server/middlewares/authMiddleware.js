// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

exports.isAdmin = (req, res, next) => {
  
  try {
   
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretKey');

    if (!decodedToken.isAdmin) {
      return res.status(401).json({ message: 'Admin access denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
