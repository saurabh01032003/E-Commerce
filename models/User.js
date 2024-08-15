// For User ka ka schema (authentication ke liye)

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Schema
const userSchema= new mongoose.Schema({
    // don't give username & password in schema as it will be stored in passport-local-mongoose
   email:{
    type: String,
    trim:true,
    required:true
   } 
}) 

userSchema.plugin(passportLocalMongoose); // for using all strategies inside passport-local-mongoose

// Model
let User = mongoose.model('User',userSchema);
module.exports = User; // export karna padega (routes ke andar review.js) me gaya hai