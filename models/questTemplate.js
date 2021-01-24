const Joi = require("joi");
const mongoose = require("mongoose");

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
    required: false,
    minlength: 2,
    maxlength: 2024,
  },
  xp: {
    type: Number,
    default: 5,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const QuestTemplate = mongoose.model("QuestTemplate", questTemplateSchema);

function validateQuestTemplate(questTemplate) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    // description: Joi.string().min(4).max(255).required(),
    // xp: Joi.number().required(),
    skill: Joi.string().required(), // Check ref is valid
    isActive: Joi.boolean(),
  });

  return schema.validate(questTemplate);
}

exports.QuestTemplate = QuestTemplate;
exports.validateQuestTemplate = validateQuestTemplate;
