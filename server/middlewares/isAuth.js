const jwt = require('jsonwebtoken');

// Middleware to verify if a user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('auth was not successful');
    return res.status(401).json({ message: 'Authentication token not provided' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    return res.status(500).json({ message: 'JWT secret is missing!' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Save the decoded user ID for future use in the request object
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = isAuthenticated;
