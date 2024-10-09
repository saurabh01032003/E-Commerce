// For review ka schema

// Model ka naam hamesha capital me & singular hota hai(see file name)
const mongoose = require('mongoose');

// Schema
const reviewSchema= new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    }
},{timestamps:true}) // database me time and date store karne ke liye

// Model
let Review = mongoose.model('Review',reviewSchema);

module.exports = Review; // export karna padega (routes ke andar review.js) me gaya hai