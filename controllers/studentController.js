const Request = require('../models/Request');

const studentController = {
  submitRequest: async (req, res) => {
    try {
      const student_id = req.user.id;
      const existing = await Request.getByStudentId(student_id);
      if (existing.length > 0) return res.status(400).json({ message: 'You already have a request' });

      const request = new Request({ student_id });
      await request.save();
      res.json({ message: 'Request submitted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  viewRequest: async (req, res) => {
    try {
      const student_id = req.user.id;
      const requests = await Request.getByStudentId(student_id);
      res.json(requests[0] || null);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = studentController;