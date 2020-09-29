const Joi = require("joi");
const mongoose = require("mongoose");
const { xpForLevel } = require("../services/skillService");

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
    maxlength: 2024,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  xp: {
    type: Number,
    required: true,
    default: 0,
  },
  levelXp: {
    type: Number,
    required: true,
    default: xpForLevel(1),
  },
  color: {
    type: String,
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

function validateSkill(skill) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    color: Joi.string().min(2).max(128).required(),
  });

  return schema.validate(skill);
}

exports.Skill = Skill;
exports.validateSkill = validateSkill;
