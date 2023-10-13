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
    // unique: true,
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


// const Joi = require('joi');

// const signupValidationSchema = Joi.object({
//     first_name: Joi.string().min(3).max(20).required(),
//     last_name: Joi.string().min(3).max(10).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).max(20).required(),
//     role: Joi.number().min(1).max(3).required(),
//     company_name: Joi.string().min(3).max(50).optional(),
//     image: Joi.string().uri().optional(),
//     address: Joi.string().required(),
//     phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$'))
//   });
  
//   const loginValidationSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).max(20).required()
//   });

// module.exports = {signupValidationSchema, loginValidationSchema};