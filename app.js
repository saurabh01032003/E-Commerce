
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')
const productRoutes = require('./routes/product') // waha se export hua hai


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB not connected, error occured");
    console.log(err);
})

app.set('view engine','ejs'); // for setting view engine type
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public'))); // for public folder


// seeding database
// seedDB(); // ek baar karke comment kar dena -> nahi toh baar baar database me data jayega(due to nodemon)


app.use(productRoutes); // so that har ek incoming request ke liye path check kiya jaye

app.listen(8080,()=>{
    console.log("Server Connected at port 8080");
})