
// schema for server side validation
// read documentation of Joi
const Joi = require('joi');


// defined schema
const productSchema = Joi.object({
    name:Joi.string()
        .required(),
    
    img:Joi.string()
        .required(),
    
    price:Joi.string()
        .required(),
    
    desc:Joi.string()
        .required()
})

const reviewSchema = Joi.object({
    rating:Joi.string()
        .min(0)
        .max(5)
        .required(),
    
    comment:Joi.string()
        .required()
})

module.exports = {productSchema,reviewSchema};