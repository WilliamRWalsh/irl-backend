const encrypt = require("../services/hash");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  /* Validate */
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /* Check if email exists */
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["email", "password"]));
  user.password = await encrypt(user.password);
  await user.save();

  //TODO: Send email with code

  const token = user.generateAuthToken();

  res.header("Authorization", token).send(_.pick(user, ["_id", "email"]));
});

module.exports = router;
