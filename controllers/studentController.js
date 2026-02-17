const Request = require('../models/Request');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET);
};

const submitRequest = async (req, res) => {
  try {
    const user = getUserFromToken(req);

    const newRequest = await Request.create({
      student_id: user.id  // 🔥 required field
    });

    return res.status(201).json({
      message: 'Request submitted',
      request: newRequest
    });

  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const viewRequest = async (req, res) => {
  try {
    const user = getUserFromToken(req);

    const requests = await Request.getByStudentId(user.id);

    return res.json({ requests });

  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { submitRequest, viewRequest };