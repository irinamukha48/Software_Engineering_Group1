const mongoose = require('mongoose')

const resturantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        building_num :{
            type: Number 
        },

        street: {
            type: "String",
            required: true
        },

        state: {
            type: String,
            required: true
        },

        country: {
            type: String,
            required: true
        },

        zip_code: {
            type: Number,
            required: true,
            
        }
    },

    items:[{
        price:{
            type: Number,  
        }
    }]
})

//let Resturant = mongoose.model('Resturant', resturantSchema , 'resturants')

//module.exports = Resturant