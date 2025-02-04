const jwt = require('jsonwebtoken');
const ResponseUtil = require('../utils/response.util');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json(ResponseUtil.fail('Authentication required'));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json(ResponseUtil.error('Invalid token'));
  }
};

module.exports = authenticateToken;