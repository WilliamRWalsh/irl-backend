const { User } = require("../models/user");
const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("whatawta");
  /* Validate */
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /* Check if email exists */
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password!");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid)
    return res.status(400).send("Invalid Email or Password!");

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).status(200).send();
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(4).max(64).required().email(),
    password: Joi.string().min(4).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
