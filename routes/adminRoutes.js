// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // import whole object
const authMiddleware = require('../middleware/authMiddleware');    // import whole object

// Protect all admin routes
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isAdmin);

// Routes
router.get('/requests', adminController.getAllRequests);
router.patch('/request/:id/approve', adminController.approveRequest);
router.patch('/request/:id/reject', adminController.rejectRequest);

module.exports = router;