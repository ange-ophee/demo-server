// server/controllers/studentController.js
const Request = require("../models/Request");

const studentController = {
  submitRequest: async (req, res) => {
    try {
      const student_id = req.user.id;
      const existing = await Request.getByStudentId(student_id);
      if (existing.length > 0) return res.status(400).json({ message: "You already have a request" });

      await Request.create(student_id);
      res.json({ message: "Request submitted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  viewRequest: async (req, res) => {
    try {
      const student_id = req.user.id;
      const results = await Request.getByStudentId(student_id);
      res.json(results[0] || null);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = studentController;