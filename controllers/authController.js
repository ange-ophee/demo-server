// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
  // -------------------------------
  // REGISTER NEW USER
  // -------------------------------
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role,
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Send back token + user info
      return res.status(201).json({
        token,
        role: user.role,
        name: user.name,
      });
    } catch (err) {
      console.error('Register error:', err);
      return res.status(500).json({ message: err.message });
    }
  },

  // -------------------------------
  // LOGIN USER
  // -------------------------------
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        role: user.role,
        name: user.name,
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;