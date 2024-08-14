
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const productRoutes = require('./routes/product') // waha se export hua hai(routes folder ke andar product.js se)
const reviewRoutes = require('./routes/review') // waha se export hua hai(routes folder ke andar review.js se)
const flash = require('connect-flash'); // for flash-messages (npm package)
const session = require('express-session'); // session (cookie and session wala)
const { nextTick } = require('process');

mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
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
    // cookie: { secure: true }
}


app.engine('ejs',ejsMate); // ejs file ko ejsMate engine(ye ek view engine hai) read karega // yaha engine set kra hai   (refer documentation of express)
app.set('view engine','ejs'); // it emplies view engine .ejs file read karega // yaha bataya hai ki view engine kis file ko read karega
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public'))); // for public folder
app.use(express.urlencoded({extended:true})); // undefine de raha tha req.body on post request (in routes->product.js-> '/products/new' on post request)
app.use(methodOverride('_method')); // method-override ke liye
app.use(flash()); // middleware for flash
app.use(session(configSession)); // upar dekho middleware for session (documentation dekh ke kar rha)

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// seeding database
// seedDB(); // ek baar karke comment kar dena -> nahi toh baar baar database me data jayega(due to nodemon)


app.use(productRoutes); // so that har ek incoming request ke liye path check kiya jaye
app.use(reviewRoutes); // so that har ek incoming request ke liye path check kiya jaye

app.listen(8080,()=>{
    console.log("Server Connected at port 8080");
})