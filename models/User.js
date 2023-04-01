const mongoose = require('mongoose');
const validator = require('validator');
const { ACCOUNT_TYPES } = require('../constant/index');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
     first_name: {
          type: String,
          required: [true, 'firstname must be included'],
          trim: true,
          maxLength: 36
     },
     last_name: {
          type: String,
          required: [true, 'lastname must be included'],
          trim: true,
     },

     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          validate: [validator.isEmail, 'Please provide a valid email'],

     },

     password: {
         type: String,
         required: true,
     },

     image: {
          type: String,
          required: false,
     },

     number: {
          type: String,
          required: true,
     },

     block: {
          type: Boolean,
          default: false,
     },

     isNumberVerified: {
          type: Boolean,
          default: false,
     },
     isEmailVerified:{
          type: Boolean,
          default: false,
     },

     userType: {
          type: String,
          enum: ACCOUNT_TYPES,
          default: ACCOUNT_TYPES[1],
     },



}, {timestamps: true})


UserSchema.pre('save', async function () {

     if (!this.isModified('password')) return;
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
   });

   UserSchema.methods.comparePassword = async function (canditatePassword) {
     const isMatch = await bcrypt.compare(canditatePassword, this.password);
     return isMatch;
   };

module.exports = mongoose.model("User", UserSchema);