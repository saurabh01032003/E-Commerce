
const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router() // mini instance/server (app.get ka istemal karna tha lekin hum puri ki puri application ko export nahi kara sakte from app.js) isliye iska alternative ek method hai ->express.Router()
const {validateReview} = require('../middleware')


router.post('/products/:id/review',validateReview ,async (req,res)=>{
    try{
        let {id} = req.params;
        let {rating, comment} = req.body;
        const product = await Product.findById(id); 
        const review = new Review({rating,comment});

        product.reviews.push(review); // product ke andar reviews collection me push karo naye review ko
        await review.save(); // save review in db 
        await product.save(); // save product in db(product ke review me change hua hai)

        res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
    
})

module.exports = router;