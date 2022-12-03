import mongoose from 'mongoose';
const { Schema } = mongoose;

const activitySchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  description: String,
  code:   String,
  dateStart: Date,
  dateFinal: Date
});

const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity