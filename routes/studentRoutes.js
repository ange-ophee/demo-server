// server/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { submitRequest, viewRequest } = require('../controllers/studentController');
const { verifyToken, isStudent} = require('../middleware/authMiddleware');

router.use(verifyToken);
router.use(isStudent);

router.post('/request', submitRequest);
router.get('request', viewRequest);

module.exports = router;