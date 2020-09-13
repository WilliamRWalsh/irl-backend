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
   * Create New Template
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

router.get("/", auth, async (req, res) => {
  /*
   * Get All Templates
   */
  const templates = await QuestTemplate.find({ user: req.user });
  res.status(200).send(templates);
});

router.patch("/:id", auth, async (req, res) => {
  /*
   * Patch Template
   */

  const templateChanges = _.pick(req.body, [
    "name",
    "description",
    "xp",
    "skill",
    "isActive",
  ]);

  const { error } = validateQuestTemplate(templateChanges);
  if (error) return res.status(400).send(error.details[0].message);

  const template = await QuestTemplate.findByIdAndUpdate(
    req.params.id,
    templateChanges
  );

  res.status(200).send(template);
});

module.exports = router;
