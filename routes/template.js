const express = require("express");
const _ = require("lodash");
const {
  QuestTemplate,
  validateQuestTemplate,
} = require("../models/questTemplate");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  /*
   * Create New Quest Template
   */

  /* Validate */
  const { error } = validateQuestTemplate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newTemplate = {
    user: req.user._id,
    ..._.pick(req.body, ["name", "description", "xp", "skill"]),
  };

  const questTemplate = new QuestTemplate(newTemplate);
  await questTemplate.save();

  res.status(201).send(newTemplate);
});

module.exports = router;
