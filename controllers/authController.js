// server/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findByEmail(email);
      if (existingUser) return res.status(400).json({ message: "Email already exists" });

      await User.create({ name, email, password, role });
      res.json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) return res.status(404).json({ message: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ token, role: user.role, name: user.name });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = authController;