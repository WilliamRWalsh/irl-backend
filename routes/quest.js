const express = require("express");
const _ = require("lodash");
const { Quest } = require("../models/quest");
const levelUpSkill = require("../services/skillService");
const auth = require("../middleware/auth");

const router = express.Router();

router.patch("/:id", auth, async (req, res) => {
  /*
   * Complete Quest
   */

  const quest = await Quest.findById(req.params.id).populate("skill");
  if (quest.isCompleted)
    return res.status(400).send("Quest is already completed.");

  // Complete Quest
  quest.isCompleted = true;
  quest.save();

  // Level up Skill
  levelUpSkill(quest);

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
