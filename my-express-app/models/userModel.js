const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;

var Users = new Schema({
  firstName: {
    type: String,
    trim: true, // it will remove space before and after string
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  gender: {
    type: String
  },
  hobbies: Any,
}, {
  timestamps: true,
  collection: 'users'
})
module.exports = mongoose.model('users', Users)