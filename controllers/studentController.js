const Request = require('../models/Request');

const submitRequest = async (_req, res, studentId) => {
  try {
    const newRequest = await Request.create({ student: studentId });
    return res.status(201).json({ message: 'Request submitted', request: newRequest });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const viewRequest = async (_req, res, studentId) => {
  try {
    const requests = await Request.find({ student: studentId });
    return res.json({ requests });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { submitRequest, viewRequest };