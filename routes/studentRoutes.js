// server/routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isStudent);

router.post("/request", studentController.submitRequest);
router.get("/request", studentController.viewRequest);

module.exports = router;