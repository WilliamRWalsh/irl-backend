
const {QuestTemplate, validateQuestTemplate} = require('../models/questTemplate');
const {Quest} = require('../models/quest');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi')

const router = express.Router();


// New Quest Template
router.post('/template', auth, async (req, res) => {
  /* Validate */
  const { error } = validateQuestTemplate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const newQuest = {
    user: req.user._id,
    ..._.pick(req.body, ['name', 'description', 'xp']),
  }

  const questTemplate = new QuestTemplate(newQuest);
  await questTemplate.save();

  res.status(201).send(newQuest);
});

// Complete Quest
router.patch('/:id', auth, async (req, res) => {
  /* Validate */
  // check for isCompleted?

  // find if exists update
  // await Quest.findById(req.params.id).update({'isCompleted': true})

  res.status(200).send();
});

// Get all Quests
router.get('/', auth, async (req, res) => {
  const quests = await Quest.find({'user': req.body.user, 'deadline_at': { $lt: Date.now }})

  res.status(200).send(quests);
});

module.exports = router; 
