
const express = require('express');
const Product = require('../models/Product');
const router = express.Router() // mini instance/server (app.get ka istemal karna tha lekin hum puri ki puri application ko export nahi kara sakte from app.js) isliye iska alternative ek method hai ->express.Router()

router.get('/products',async (req,res)=>{
    // database se product access karke than send to index.ejs(res.render)
    let products = await Product.find(); // javascript ke sath kaam karte hai to mongoDB ke methods returs promise isliye async-await laga do
    res.render('index',{products});
})

module.exports = router;