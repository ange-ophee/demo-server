const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // correct import

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;