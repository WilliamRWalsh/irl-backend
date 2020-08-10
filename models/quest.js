const Joi = require('joi')
const mongoose = require('mongoose')

const DAY_IN_MICRO_SECONDS = 24*60*60*1000;

const questSchema = new mongoose.Schema({
  questTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isCompleted: Boolean,
  created_at: {
    type: Date,
    default: Date.now,
  },
  deadline_at: {
    type: Date,
    default: Date.now + DAY_IN_MICRO_SECONDS,
  }
});

const Quest = mongoose.model('Quest', questSchema);

exports.Quest = Quest;