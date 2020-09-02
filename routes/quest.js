const {
  QuestTemplate,
  validateQuestTemplate,
} = require("../models/questTemplate");
const { Quest } = require("../models/quest");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");

const router = express.Router();

router.post("/template", auth, async (req, res) => {
  /*
   * Create New Quest Template
   */

  /* Validate */
  const { error } = validateQuestTemplate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newQuest = {
    user: req.user._id,
    ..._.pick(req.body, ["name", "description", "xp"]),
  };

  const questTemplate = new QuestTemplate(newQuest);
  await questTemplate.save();

  res.status(201).send(newQuest);
});

router.patch("/:id", auth, async (req, res) => {
  /*
   * Complete Quest
   */

  const quest = await Quest.findById(req.params.id).populate("skill");
  if (quest.isCompleted)
    return res.status(400).send("Quest is already completed.");

  quest.isCompleted = true;
  quest.save();

  // TODO: Create service to update skill xp
  quest.skill.xp += quest.xp;
  quest.skill.save();

  res.status(200).send();
});

router.get("/", auth, async (req, res) => {
  /*
   * Get All Quests
   */

  const now = Date.now();

  const quests = await Quest.find({
    user: req.user,
    createdAt: { $lte: now },
    deadlineAt: { $gte: now },
  });

  res.status(200).send(quests);
});

module.exports = router;
