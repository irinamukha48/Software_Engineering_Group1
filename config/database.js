const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://ECE_GrubHub_Admin:DaJoUVFGGBzWVC7z@ecegrubhub.tgq2nbt.mongodb.net/ECE_GrubHub",{ useNewUrlParser: true } , (err)=> {
    if (err) {
        console.log(err)
    } else {
        console.log('connected...')
    }
})