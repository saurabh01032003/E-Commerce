const mongoose = require('mongoose');

const Product = require('./models/Product.js') // jo models->Product.js se export hua tha

const products = [
    {
        name:"Apple iPhone 15 Plus",
        img:"https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:75999, 
        desc:"(Black, 128 GB)"
    },
    {
        name:"iPad Pro",
        img:"https://images.unsplash.com/photo-1627405016867-4d59bd6b4747?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGlwYWQlMjBwcm98ZW58MHx8MHx8fDA%3D",
        price: 237900, 
        desc:"Ultra Retina XDR display"
    },
    {
        name:"Macbook",
        img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwYXBwbGV8ZW58MHx8MHx8fDA%3D",
        price:150000, 
        desc:" 11-core CPU with 5 performance cores and 6 efficiency cores"
    },
    {
        name:"Apple AirPods Pro",
        img:"https://images.unsplash.com/photo-1588940086836-36c7d89611a0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBwbGUlMjBhaXJwb2RzfGVufDB8fDB8fHww",
        price:18900, 
        desc:"White, True Wireless"
    },
    {
        name:"OnePlus Nord CE",
        img:"https://images.unsplash.com/photo-1650016883397-1225cb4e47b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 20000,
        desc:"Blue, 256 GB"
    },
    {
        name:"Poco M2",
        img: "https://images.unsplash.com/photo-1570633545582-cd25ed6e8497?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NjV8ODgwNzQ2Mnx8ZW58MHx8fHx8",
        price:10000,
        desc:"Its inside your budget"
    },
    {
        name:"Apple Watch Series 9",
        img:"https://plus.unsplash.com/premium_photo-1681147547346-2d73c90988d8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2F0Y2glMjBhcHBsZXxlbnwwfHwwfHx8MA%3D%3D",
        price : 37999,
        desc : "If you have enough money buy it"
    }
]

async function seedDB(){
    // mongoDB ke saare operations i.e insertOne,insertMany returns a promise(i.e isliye hum async await laga sakte -> to prevent from promise chaining)
    await Product.insertMany(products); // insertMany model(Product) ke upar lagega(db me collection ke upar lagta tha n)
    console.log("Data seeded successfully");
}

module.exports = seedDB; // yaha se vej do chalana to app.js me hai n , waha require kar lena
