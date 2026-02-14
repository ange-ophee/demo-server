// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllRequests, approveRequest, rejectRequest } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.use(isAdmin);

router.get('/requests', getAllRequests);
router.patch('/request/:id/approve', approveRequest);
router.patch('/request/:id/reject', rejectRequest);

module.exports = router;