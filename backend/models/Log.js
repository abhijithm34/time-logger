const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  activity: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  minutes: { type: Number, required: true },
});

module.exports = mongoose.model('Log', logSchema); 