const Request = require('../models/Request');

const getAllRequests = async (_req, res) => {
  try {
    const requests = await Request.find().populate('student_id', 'name email');
    return res.json({ requests });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const approveRequest = async (_req, res, id) => {
  try {
    const request = await Request.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    return res.json({ message: 'Request approved', request });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const rejectRequest = async (_req, res, id) => {
  try {
    const request = await Request.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    return res.json({ message: 'Request rejected', request });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllRequests, approveRequest, rejectRequest };
