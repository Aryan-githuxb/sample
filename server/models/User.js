const mongoose = require('mongoose');

// Schema: The blueprint for our data
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // We will store the HASHED password, not plain text
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);