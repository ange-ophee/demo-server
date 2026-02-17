const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'Pending' },
    request_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

requestSchema.statics.getByStudentId = function(studentId) {
  return this.find({ student_id: studentId });
};

requestSchema.statics.getAllRequests = function() {
  return this.find().populate('student_id', 'name email role');
};

requestSchema.statics.updateStatusById = function(id, status) {
  return this.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = mongoose.model('Request', requestSchema);

const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', RequestSchema);