/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student request management
 */

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); 
const authMiddleware = require('../middleware/authMiddleware');

// Protect all student routes
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isStudent);

/**
 * @swagger
 * /student/request:
 *   post:
 *     summary: Submit a request
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request submitted successfully
 */
router.post('/request', studentController.submitRequest);

/**
 * @swagger
 * /student/request:
 *   get:
 *     summary: View student request
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request fetched successfully
 */
router.get('/request', studentController.viewRequest);

module.exports = router;