const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require("passport-local-mongoose");
var userSchema = mongoose.Schema({
    email   : String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};
const User = new mongoose.model("User",userSchema);
module.exports = User;
