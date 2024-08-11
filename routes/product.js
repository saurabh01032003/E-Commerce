
const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router() // mini instance/server (app.get ka istemal karna tha lekin hum puri ki puri application ko export nahi kara sakte from app.js) isliye iska alternative ek method hai ->express.Router()


// To show all the products
router.get('/products',async (req,res)=>{
    // database se product access karke than send to index.ejs(res.render)
    let products = await Product.find(); // javascript ke sath kaam karte hai to mongoDB ke methods returs promise isliye async-await laga do
    res.render('products/index',{products});
})

// See Routing Table for below

// To show form for adding new products
router.get('/products/new',(req,res)=>{
    res.render('products/new'); // views tk ka path pata hai hame
})

// To actually add the products(form submit karne pr yaha aayega post->request hai)
router.post('/products',async (req,res)=>{
    let {name,img,price,desc} = req.body; // post request se data hame req.body me milti hai
    await Product.create({name,img,price,desc}); // mongoDB method -> returns promise in js (isliye async and await)
    res.redirect('/products');
})

// To Show particular Product
router.get('/products/:id',async (req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id).populate('reviews'); // Model ka method hai(findById) -> returns a promise //reviews ke array ke sath populate karo(link bana diya dono me)
    res.render('products/show',{foundProduct});
})

// Form to edit the product
router.get('/products/:id/edit',async (req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit',{foundProduct});
})

// To actully edit the data in Db(hi when edit ka form submit hoga)
router.patch('/products/:id',async (req,res)=>{
    let {id} = req.params;
    let {name,img,price, desc} = req.body;
    let updatedProduct =  await Product.findByIdAndUpdate(id , {name,img,price, desc}); // pahla argument me edit hone se pahle ki id(req.params), dusre me edit hone ke baad ka data(req.body) -> MongoDB ka method hai -> DB me update kardega purane data ko edited se
    res.redirect(`/products/${id}`);
})

// to delete a product (index.ejs ke andar form hai uska =>button click karne pr hi hoga)
router.delete('/products/:id', async (req,res)=>{
    let {id} = req.params;
    const product = await Product.findById(id);
    // Upar jo product mila hai uska => delete all reviews (as it is an array)
    // Product se pahle reviews delete kardo uska -> kyonki review bhi db me jagah le raha
    for(let id of product.reviews){
        await Review.findByIdAndDelete(id);
    }

    await Product.findByIdAndDelete(id); // method to delete from db
    res.redirect('/products');
})

module.exports = router;