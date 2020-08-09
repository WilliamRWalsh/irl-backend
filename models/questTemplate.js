const Joi = require('joi')
const mongoose = require('mongoose')

const questTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2024,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  xp: {
    type: Number,
    required: true,
  },
});

const QuestTemplate = mongoose.model('QuestTemplate', QuestTemplate);

exports.QuestTemplate = QuestTemplate;
exports.validate = validateQuestTemplate;