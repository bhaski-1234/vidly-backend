const mongoose = require('mongoose');
const Joi = require('joi');
const {customerSchema} = require('./customer');
const {movieSchema} = require('./movie');

const Rental  = mongoose.model('Rental',new mongoose.Schema({
    customer : {
        type : customerSchema,
        required : true 
    },
    movie : {
        type : movieSchema,
        required : true
    },
    dateOut : {
        type : Date,
        required : true,
        default : Date.now
    },
    dateReturned : {
        type : Date
    },
    rentalFee : {
        type : Number,
        min : 0
    }
}));

function validateRental(rental){
     const schema = Joi.object({
         customerId : Joi.string().required(),
         movieId : Joi.string().required()
     });
     return schema.validate(rental);
}
exports.Rental = Rental;
exports.validate = validateRental;
