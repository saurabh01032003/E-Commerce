
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash'); // for flash-messages (npm package)
const session = require('express-session'); // session (cookie and session wala)
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const dotenv = require('dotenv');
dotenv.config({path:'.env'});



const productRoutes = require('./routes/product') // waha se export hua hai(routes folder ke andar product.js se)
const reviewRoutes = require('./routes/review') // waha se export hua hai(routes folder ke andar review.js se)
const authRoutes = require('./routes/auth') // waha se export hua hai(routes folder ke andar auth.js se)
const cartRoutes = require('./routes/cart') // waha se export hua hai(routes folder ke andar cart.js se)


// mongoose.connect('mongodb+srv://Saurabh:Password@cluster0.ljhcm.mongodb.net/E-commerceretryWrites=true&w=majority&appName=Cluster0')
// mongodb+srv://saursnehu143:1Hxt0mVn7Y1QVOxw@cluster0.yzll2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(`${process.env.ATLAS_URL}`)
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB not connected, error occured");
    console.log(err);
})


// middleware for session
let configSession = { //achha dikhne ke liye variable me assign kara hai
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly : true,
        expires:Date.now() + 7*24*60*60*1000, // abhi se 7 days baad expire ho jayega 
        maxAge: 7*24*60*60*1000 // '/product' route pe jake inspect karke application -> cookies -> http wale ka time dekho -> 7 din baad expire hone ka timer start ho chuka hai
    }
}


app.engine('ejs',ejsMate); // ejs file ko ejsMate engine(ye ek view engine hai) read karega // yaha engine set kra hai   (refer documentation of express)
app.set('view engine','ejs'); // it emplies view engine .ejs file read karega // yaha bataya hai ki view engine kis file ko read karega
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public'))); // for public folder
app.use(express.urlencoded({extended:true})); // undefine de raha tha req.body on post request (in routes->product.js-> '/products/new' on post request)
app.use(methodOverride('_method')); // method-override ke liye
app.use(flash()); // middleware for flash
app.use(session(configSession)); // upar dekho middleware for session (documentation dekh ke kar rha)

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user; // taki hum kahi se use kar paye
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// PASSPORT
passport.use(new LocalStrategy(User.authenticate()));

// seeding database
// seedDB(); // ek baar karke comment kar dena -> nahi toh baar baar database me data jayega(due to nodemon)


app.use(productRoutes); // so that har ek incoming request ke liye path check kiya jaye
app.use(reviewRoutes); // so that har ek incoming request ke liye path check kiya jaye
app.use(authRoutes); // so that har ek incoming request ke liye path check kiya jaye
app.use(cartRoutes); // so that har ek incoming request ke liye path check kiya jaye

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(8080,()=>{
    console.log("Server Connected at port 8080");
})