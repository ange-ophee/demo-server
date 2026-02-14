// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin request management
 */

/**
 * @swagger
 * /admin/requests:
 *   get:
 *     summary: Get all student requests
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all student requests
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not an admin)
 */
router.get('/requests', authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.getAllRequests);

/**
 * @swagger
 * /admin/request/{id}/approve:
 *   patch:
 *     summary: Approve a student request
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     responses:
 *       200:
 *         description: Request approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Request not found
 */
router.patch('/request/:id/approve', authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.approveRequest);

/**
 * @swagger
 * /admin/request/{id}/reject:
 *   patch:
 *     summary: Reject a student request
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     responses:
 *       200:
 *         description: Request rejected successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Request not found
 */
router.patch('/request/:id/reject', authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.rejectRequest);

module.exports = router;