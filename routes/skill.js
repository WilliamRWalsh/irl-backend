const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { Skill, validateSkill } = require("../models/skill");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  /*
   * Get All Skills
   */

  const skills = await Skill.find({
    user: req.user,
  });

  res.status(200).send(skills);
});

router.post("/", auth, async (req, res) => {
  /*
   * Create a New Skills
   */

  /* Validate */
  const { error } = validateSkill(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newSkill = {
    user: req.user._id,
    ..._.pick(req.body, ["name", "color"]),
  };

  const skill = new Skill(newSkill);
  await skill.save();

  res.status(201).send(skill);
});

module.exports = router;
