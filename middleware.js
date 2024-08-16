const Product = require('./models/Product');
const {productSchema , reviewSchema} = require('./schema')

// validated schema
const validateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc})
    if(error){
        return res.render('error');
    }
    next();
}

const validateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment})
    if(error){
        return res.render('error');
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
    // agar authenticated user hoga tabhi next pe jao nahi toh send it to login page first
    if(!req.isAuthenticated()){
        req.flash('error','please login first!');
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){ // agar kisi ne role provide nahi kara -> role field me
        req.flash('error','You do not have permission to do that')
        return res.redirect('/products');
    }else if(req.user.role !== 'seller'){ // agar role seller nahi hai i.e buyer hai
        req.flash('error','You do not have the permission to do that')
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async (req,res,next) =>{
    let {id} = req.params; // product id
    let product = await Product.findById(id);// entire product
    if(!product.author.equals(req.user._id)){ // method hai jo check karega whether product.author == req.user._id(i.e user jo loged in hai)
        req.flash('error','You are not the authorised user to delete this product');
        return res.redirect('/products');
    }
    next();
}

module.exports = {isProductAuthor, isSeller, isLoggedIn, validateReview , validateProduct}