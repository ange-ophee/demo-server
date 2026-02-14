const Request = require('../models/Request');

const adminController = {
  getAllRequests: async (_req, res) => {
    try {
      const requests = await Request.getAllRequests();
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  approveRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Request.updateStatusById(id, 'Approved');
      if (!updated) return res.status(404).json({ error: 'Request not found' });
      res.json({ message: 'Request approved' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  rejectRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Request.updateStatusById(id, 'Rejected');
      if (!updated) return res.status(404).json({ error: 'Request not found' });
      res.json({ message: 'Request rejected' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = adminController;