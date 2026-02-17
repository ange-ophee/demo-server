const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const StudentController = require('../controllers/studentController');

router.post('/request', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'student') return res.status(403).json({ message: 'Access denied' });

    await StudentController.submitRequest(req, res, decoded.id);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

router.get('/request', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'student') return res.status(403).json({ message: 'Access denied' });

    await StudentController.viewRequest(req, res, decoded.id);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;