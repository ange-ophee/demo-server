// server/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // import whole object
const authMiddleware = require('../middleware/authMiddleware');        // import whole object

// Protect all student routes
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isStudent);

// Routes
router.post('/request', studentController.submitRequest);
router.get('/request', studentController.viewRequest); // fixed missing '/'

module.exports = router;