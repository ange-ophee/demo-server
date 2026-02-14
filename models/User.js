// server/models/User.js
const { getCollection } = require("../db");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

const User = {
  create: async ({ name, email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await getCollection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });
    return result;
  },

  findByEmail: async (email) => {
    return getCollection("users").findOne({ email });
  },

  findById: async (id) => {
    return getCollection("users").findOne({ _id: new ObjectId(id) });
  },
};

module.exports = User;