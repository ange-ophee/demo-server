// server/models/Request.js
const { getCollection } = require("../db");
const { ObjectId } = require("mongodb");

const Request = {
  create: async (studentId) => {
    return getCollection("requests").insertOne({
      student_id: new ObjectId(studentId),
      request_date: new Date(),
      status: "Pending",
    });
  },

  getByStudentId: async (studentId) => {
    return getCollection("requests")
      .find({ student_id: new ObjectId(studentId) })
      .toArray();
  },

  getAll: async () => {
    return getCollection("requests")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "student_id",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
      ])
      .toArray();
  },

  updateStatus: async (id, status) => {
    return getCollection("requests").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
  },
};

module.exports = Request;