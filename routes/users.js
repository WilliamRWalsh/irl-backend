const _ = require('lodash')
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  /* Validate */
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  /* Check if email exists */
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['email', 'password']));

  await user.save();

  res.send(_.pick(user, ['_id', 'email']));
});

module.exports = router; 
