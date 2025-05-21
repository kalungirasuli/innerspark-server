const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify admin privileges
module.exports = function(req, res, next) {
  // Check if user exists in request (auth middleware should run first)
  if (!req.user) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }

  // Check if user has admin role
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Access denied. Admin privileges required' });
  }

  next();
};