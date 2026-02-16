const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authController = {
  register: async (req, res, next) => { // <--- Added 'next' here
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const user = new User({ name, email, password, role });
      await user.save(); // This triggers your pre('save') hook
      res.json({ message: 'User registered successfully' });
    } catch (err) {
      // Pass the error to the next error-handling middleware
      // This is the standard way to handle async errors in Express
      next(err); // <--- Changed from res.status to next(err)
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, role: user.role, name: user.name });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = authController;