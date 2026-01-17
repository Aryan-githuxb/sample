const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'super_secret_key_123'; // In real apps, put this in .env

// 1. SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  try {
    // Data Flow: Frontend sends { username, password } inside req.body
    const { username, password } = req.body;

    // Logic: Hash the password before saving so it's secure
    const hashedPassword = await bcrypt.hash(password, 10);

    // Logic: Create new user instance
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Logic: Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'User not found' });

    // Logic: Compare the password sent by frontend with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Logic: Generate a TOKEN (JWT). This is the "ID Card" the frontend will keep.
    const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Data Flow: Send the token and username back to the frontend
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;