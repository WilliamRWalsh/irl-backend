const Joi = require('joi')
const mongoose = require('mongoose')

const questSchema = new mongoose.Schema({
  questTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

});

const Quest = mongoose.model('Quest', Quest);

exports.Quest = Quest;