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
    required: true,
    minlength: 2,
    maxlength: 2024,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  xp: {
    type: Number,
    required: true,
  },
  levelXp: {
    type: Number,
    required: true,
  },
});

const QuestTemplate = mongoose.model("QuestTemplate", questTemplateSchema);

function validateQuestTemplate(questTemplate) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    description: Joi.string().min(4).max(255).required(),
    xp: Joi.number().required(),
  });

  return schema.validate(questTemplate);
}

exports.QuestTemplate = QuestTemplate;
exports.validateQuestTemplate = validateQuestTemplate;
