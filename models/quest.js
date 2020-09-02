const Joi = require("joi");
const mongoose = require("mongoose");

const DAY_IN_MICRO_SECONDS = 24 * 60 * 60 * 1000;

const questSchema = new mongoose.Schema({
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
  isCompleted: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadlineAt: {
    type: Date,
    default: () => Date.now + DAY_IN_MICRO_SECONDS,
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
  },
});

const Quest = mongoose.model("Quest", questSchema);

function validateQuest(quest) {
  const schema = Joi.object({
    // TODO: Finish this
    name: Joi.string().min(2).max(128).required(),
  });

  return schema.validate(quest);
}

exports.Quest = Quest;
exports.validateQuest = validateQuest;
