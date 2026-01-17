const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// --- MIDDLEWARE ---
// CORS allows the frontend (port 3000) to talk to backend (port 5000)
app.use(cors()); 
// This allows us to parse JSON bodies sent from the frontend
app.use(express.json()); 

// --- DATABASE CONNECTION ---
// Make sure MongoDB is running locally!
mongoose.connect('mongodb://127.0.0.1:27017/mern-educational-app')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- ROUTES ---
// Any request starting with /auth goes to our authRoutes file
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});