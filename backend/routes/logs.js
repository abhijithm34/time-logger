const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// Add a log entry
router.post('/', async (req, res) => {
  try {
    const { activity, date, minutes } = req.body;
    if (!activity || !date || typeof minutes !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }
    const log = new Log({ activity, date, minutes });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a log entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Log.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Log not found' });
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all log entries
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get log entries for a specific date
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const logs = await Log.find({ date });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get per-activity summary for a date
router.get('/summary/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const summary = await Log.aggregate([
      { $match: { date } },
      { $group: { _id: '$activity', totalMinutes: { $sum: '$minutes' } } },
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 