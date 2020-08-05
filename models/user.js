const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 64,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    email: Joi.string().min(4).max(64).required().email(),
    password: Joi.string().min(4).max(255).required(),
  }
}

exports.User = User;
exports.validate = validateUser;