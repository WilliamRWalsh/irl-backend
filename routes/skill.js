const auth = require("../middleware/auth");
const express = require("express");
const { Skill } = require("../models/skill");

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

module.exports = router;
