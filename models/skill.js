const Joi = require("joi");
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
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
  level: {
    type: Number,
    required: true,
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

const Skill = mongoose.model("Skill", skillSchema);

function validateSkill(skill) {
  const schema = Joi.object({
    // TODO: Finish this
    name: Joi.string().min(2).max(128).required(),
  });

  return schema.validate(skill);
}

exports.Skill = Skill;
exports.validateSkill = validateSkill;
