import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email:  String, // String is shorthand for {type: String}
  password: String,
  isProffesor:   Boolean,
  listActivity: [],
});

const User = mongoose.model('User', userSchema)
module.exports = User