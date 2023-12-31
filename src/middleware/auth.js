const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User')

module.exports = async function  (req, res, next) {
  // Get token from header
  const token = req.header('authorization');
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Sem token, autorização negada' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    req.user = await User.findById(decoded.user.id).select('-password');
    req.userId = decoded.user.id
    next();
  } catch (err) {
    res.status(401).json({ msg: 'O token não é válido' });
  }
};
