const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport'); // authenticate karne se pahle require karna padega

// to show the form for signup
router.get('/register' ,(req,res)=>{
    res.render('auth/signup');
})

// actually want to register a user in my db
router.post('/register',async (req,res)=>{ // POST method se form submit hoga(views-> auth-> signup.ejs ke andar ka form) chalega ye route

    try{
        let {email,password,username} = req.body; // post method se form submit hua hai
        const user =  new User({email,username}); // user ko password alag argument me dena hai -> user ko ek me see documentation (plm register)
        const newUser = await User.register(user,password); // register() is an static method -> isko hum schema ya model ke upar laga sakte(User is a method) -> naye user ko db me add karwana hai
        // res.redirect('/login');  // register karne ke baad hame dubara login karne ki jarurat nahi hai
        
        // what i want is ki main login ho jau page pe after registering only
        req.login(newUser,function(err){
            if(err){
                return next(err); // agar error aaya tb
            }
            req.flash('success', 'Welcome, You registered successfully!');
            return res.redirect('/products');// nahi aaya any error after registering tb products wale route ko hit kardo(login hogaya)
        })
    }
    catch(e){
        req.flash('error',e.message);
        return res.redirect('/signup');
    }

})

// to get login form
router.get('/login' ,(req,res)=>{
    res.render('auth/login');
})

// to actually login via the db
router.post('/login' ,
    passport.authenticate('local', 
    {
        failureRedirect: '/login', 
        failureMessage:true
    }),
    (req,res)=>{
        req.flash('success','Welcome Back !');
        res.redirect('/products');
});

// logout
// https://www.passportjs.org/concepts/authentication/logout/ (visit this link)
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success','See you again!')
    res.redirect('/login');
})

module.exports = router;