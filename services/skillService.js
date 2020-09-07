function levelUpSkill(quest) {
  const questXp = quest.xp;
  const currentXp = quest.skill.xp;
  const currentLvlXp = quest.skill.levelXp;

  const newXp = currentXp + questXp;
  if (newXp > currentLvlXp) {
    quest.skill.level++;
    quest.skill.levelXp = xpForLevel(quest.skill.level);
    quest.skill.xp = newXp - currentLvlXp;
  } else {
    quest.skill.xp = newXp;
  }
  quest.skill.save();
}

function xpForLevel(level) {
  return 50 * level;
}

module.exports = levelUpSkill;
