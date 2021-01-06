const { QuestTemplate } = require("../models/questTemplate");
const { Quest } = require("../models/quest");
const mongoose = require("mongoose");
const { exist } = require("joi");

module.exports = async function generateDailyQuestsForAllUsers() {
  await mongoose
    .connect("mongodb://localhost/irl")
    .then(() => console.log("Connected to DB..."))
    .catch((err) => console.log(err));

  const templates = await QuestTemplate.find({
    isActive: true,
  });

  const newQuests = templates.map((t) => {
    t = t.toObject();
    delete t._id;
    delete t.isActive;
    return t;
  });

  const questCreated = await Quest.insertMany(newQuests);

  console.log("Daily Quests created: " + questCreated.length);

  process.exit(1);
};

require("make-runnable");
