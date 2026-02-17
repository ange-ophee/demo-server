// server/routes/adminRoutes.js
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

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminController = require('../controllers/adminController');

router.get('/requests', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    await AdminController.getAllRequests(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

router.patch('/request/:id/approve', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    await AdminController.approveRequest(req, res, req.params.id);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

router.patch('/request/:id/reject', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    await AdminController.rejectRequest(req, res, req.params.id);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;