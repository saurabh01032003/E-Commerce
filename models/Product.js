// Model ka naam hamesha capital me & singular hota hai(see file name)
const mongoose = require('mongoose');

// Schema
const productSchema= new mongoose.Schema({
    name: {
        type:String, // name string type ki hogi
        trim:true,  // extra spaces remove karne ke liye i.e (   sam   ) === (sam)
        required: true // you must need to provide name field in product
    },
    img:{
        type:String,
        trim:true,
        // default:

    },
    price:{
        type:String, // kyonki mereko Rs 5000 likhna hai
        // min: 0, // negative price thodi n hogi
        required:true,
    },
    desc : {
        type:String,
        trim:true
    },
    reviews:[ // this will map review of 1 product to -> many reviews of review Model
        {
            type: mongoose.Schema.ObjectId, // Review Model ke andar various reviews ko extract karna hai(uske liye reviews ki id chaiye apne ko)
            ref: 'Review'
        }
    ]
})

// Model
let Product = mongoose.model('Product',productSchema);

module.exports = Product; // export karna padega (routes ke andar product.js) me gaya hai