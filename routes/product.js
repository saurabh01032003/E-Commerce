
const express = require('express');
const Product = require('../models/Product');// export hua tha models ke andar Product.js se (routes ke andar product.js) me gaya hai
const Review = require('../models/Review');
const router = express.Router() // mini instance/server (app.get ka istemal karna tha lekin hum puri ki puri application ko export nahi kara sakte from app.js) isliye iska alternative ek method hai ->express.Router()
const {validateProduct, isLoggedIn, isSeller,isProductAuthor} = require('../middleware')


// To show all the products
router.get('/products', async (req,res)=>{
    try{
        // database se product access karke than send to index.ejs(res.render)
        let products = await Product.find(); // javascript ke sath kaam karte hai to mongoDB ke methods returs promise isliye async-await laga do
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

// See Routing Table for below

// // To show form for adding new products
// router.get('/products/new',isLoggedIn,(req,res)=>{
//     try{
//         res.render('products/new'); // views tk ka path pata hai hame
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message});
//     }
// })

// To actually add the products(form submit karne pr yaha aayega post->request hai)
// router.post('/products', isLoggedIn,validateProduct, isSeller, async (req,res)=>{ // validate hone ke baad ->next() ke call hone ke baad call back function chalega async wala
//     try{
//         let {name,img,price,desc} = req.body; // post request se data hame req.body me milti hai
//         await Product.create({name,img,price,desc,author: req.user._id}); // mongoDB method -> returns promise in js (isliye async and await)
//         req.flash('success', 'New product added successfully');
//         res.redirect('/products');
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message});
//     }
// })

// To Show particular Product
// router.get('/products/:id',isLoggedIn,async (req,res)=>{
//     try{
//         let {id} = req.params;
//         let foundProduct = await Product.findById(id).populate('reviews'); // Model ka method hai(findById) -> returns a promise //reviews ke array ke sath populate karo(link bana diya dono me)
//         res.render('products/show',{foundProduct, msg:req.flash('msg')}); // second argument is flash messages
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message});
//     }
// })

// Form to edit the product
// router.get('/products/:id/edit',isLoggedIn,isProductAuthor, async (req,res)=>{
//     try{
//         let {id} = req.params;
//         let foundProduct = await Product.findById(id);
//         res.render('products/edit',{foundProduct});
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message});
//     }
// })

// To actully edit the data in Db(hi when edit ka form submit hoga)
router.patch('/products/:id' ,isLoggedIn,validateProduct,async (req,res)=>{
    try{
        let {id} = req.params;
        let {name,img,price, desc} = req.body;
        let updatedProduct =  await Product.findByIdAndUpdate(id , {name,img,price, desc}); // pahla argument me edit hone se pahle ki id(req.params), dusre me edit hone ke baad ka data(req.body) -> MongoDB ka method hai -> DB me update kardega purane data ko edited se

        // req.flash('msg', 'Product edited successfully');
        req.flash('success', 'Product edited successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

// to delete a product (index.ejs ke andar form hai uska =>button click karne pr hi hoga)
// router.delete('/products/:id' ,isLoggedIn,isProductAuthor, async (req,res)=>{
//     try{
//         let {id} = req.params;
//         const product = await Product.findById(id);

//         // // Upar jo product mila hai uska => delete all reviews (as it is an array)
//         // // Product se pahle reviews delete kardo uska -> kyonki review bhi db me jagah le raha
//         for(let id of product.reviews){
//             await Review.findByIdAndDelete(id);
//         }

//         await Product.findByIdAndDelete(id); // method to delete from db // is method ke chalne par schema me jo middleware hai 'findOneAndDelete' wo trigger ho raha -> jo yaha se id gyi hai whi product me catch hui hai waha
//         req.flash('success', 'Product deleted successfully');
//         res.redirect('/products');
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message});
//     }
// })


module.exports = router;