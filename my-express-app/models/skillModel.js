const mongoose = require('mongoose');
var Schema = mongoose.Schema
var Any = mongoose.Schema.Types.Mixed
var Skills = new Schema({
  userId: '',
  name: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'skills'
});
module.exports = mongoose.model('skills', Skills);