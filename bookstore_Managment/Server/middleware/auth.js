const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'Vinay@#23');
    req.user = decodedToken
    if (!decodedToken) {
      throw new Error('Invalid user ID'); // Use `new Error` to create a proper error object
    }
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid token'
    });
  }
};
