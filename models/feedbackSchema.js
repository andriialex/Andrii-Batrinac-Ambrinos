const mongoose = require('mongoose')
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  idActivity:  Number,
  time: Date,
  type:   String,
});

const feedback = mongoose.model('Feedback', feedbackSchema)
module.exports = feedback