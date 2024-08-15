
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

module.exports = {isLoggedIn, validateReview , validateProduct}