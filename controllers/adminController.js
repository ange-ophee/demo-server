// server/controllers/adminController.js
const Request = require("../models/Request");
const { ObjectId } = require("mongodb");

const adminController = {
  getAllRequests: async (_req, res) => {
    try {
      const results = await Request.getAll();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  approveRequest: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || !ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid request ID" });

      const result = await Request.updateStatus(id, "Approved");
      if (result.modifiedCount === 0) return res.status(404).json({ error: "Request not found" });

      res.json({ message: "Request approved" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  rejectRequest: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || !ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid request ID" });

      const result = await Request.updateStatus(id, "Rejected");
      if (result.modifiedCount === 0) return res.status(404).json({ error: "Request not found" });

      res.json({ message: "Request rejected" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = adminController;