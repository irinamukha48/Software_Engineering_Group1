const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passportLocalMongoose = require("passport-local-mongoose");

/**
* User Schema
*/
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true, 
    },

    email: {
        type: String,
        required: true, 
    },

    
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    vendor:{
        type: String,
        required: true
    },
    deliveryAddress:{
        type: String,
        required: true
    },
    
    /*order: [{
        
        orderNo: {
            type: String 
        },
        _orderId : {
            type : mongoose.Schema.ObjectID
        }
    }],
 
    phone: {
        type: String
    },
    */
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    
})

userSchema.plugin(passportLocalMongoose);

userSchema.methods.generateEncryptedPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
};
userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

let User = mongoose.model('User', userSchema, 'users')

module.exports = User