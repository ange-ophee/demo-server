// server/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isAdmin);

router.get("/requests", adminController.getAllRequests);
router.patch("/request/:id/approve", adminController.approveRequest);
router.patch("/request/:id/reject", adminController.rejectRequest);

module.exports = router;