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
            type: mongoose.Schema.Types.ObjectId, // Review Model ke andar various reviews ko extract karna hai(uske liye reviews ki id chaiye apne ko)
            ref: 'Review'
        }
    ] ,
    author:{ // ek product ka ek hi author ho sakta 
        type: mongoose.Schema.Types.ObjectId, // user ki id ke liye(User model se extract kara hai property)
        ref: 'User'
    },
    countCart:{

    }
})

// // Alternate method to delete reviews before deleting product( production pr use hota hai) -> Chal nahi raha tha abhi doubt sir se poochna-> alternate method use karo tabtk

// // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
// // Use above as reference -> middleware jo BTS(behind the scene) mongodb operations karwane par use hota hai and iske andar 'pre' & 'post' middleware
// // hote hai which are basically used over the schema and before the model in js class

// productSchema.post('findOneAndDelete', async function(product) {
//     if(product.reviews.length > 0){
//         await Review.deleteMany({_id:{$in:product.reviews}})
//     }
// })


// Model
let Product = mongoose.model('Product',productSchema);
module.exports = Product; // export karna padega (routes ke andar product.js) me gaya hai