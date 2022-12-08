const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { ConnectionPolicyPage } = require('twilio/lib/rest/voice/v1/connectionPolicy');
const e = require('connect-flash');

const bcrypt = require('bcrypt')

generateEncryptedPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
};

validatePassword = function(password,confirmPassword){
    return bcrypt.compareSync(password, confirmPassword);
};

exports.render_registration = function(req,res) {
    res.render('register', {
        errors: req.flash('errors'),
        error: req.flash('error')
    })
}

exports.render_login = function(req,res) {
    res.render('login', {
        errors: req.flash('errors'),
        error: req.flash('error')
    })
}

exports.user_profile = function (req,res){
    res.render("profile",{
        errors: req.flash('errors'),
        error: req.flash('error'),
        user:req.user});
}

exports.render_edit_profile = function (req,res){
    res.render("editProfile",{
        errors: req.flash('errors'),
        error: req.flash('error'),
        user:req.user});
}

exports.edit_profile = function (req,res){

    var name  = (req.body.name.length == 0) ? req.user.name : req.body.name ;
    var username = (req.body.username.length == 0) ? req.user.username : req.body.username ;
    var email = (req.body.email.length == 0) ? req.user.email : req.body.email ;
    var deliveryAddress = (req.body.deliveryAddress.length == 0) ? req.user.deliveryAddress : req.body.deliveryAddress ;
    var password = (req.body.password.length == 0) ? req.user.password : generateEncryptedPassword(req.body.password) ;
    var confirmPassword = (req.body.confirmPassword.length == 0) ? req.user.password : generateEncryptedPassword(req.body.confirmPassword) ;
    
    var correctPassword = req.user.password;

    if(password != confirmPassword)
    {
        res.render('editProfile',{user:req.user, errors : "Passwords Dont Match"});
    }
    else
    {
        correctPassword = password;

        User.findOne({email:req.user.email}, (err, foundUser) =>{
            if(err)
            {
                res.redirect("/profile/edit");
            }
            if(foundUser)
            {
                User.findOneAndUpdate({email:req.user.email},{ "$set": { "name": name, "username": username, "deliveryAddress": deliveryAddress, "password": correctPassword, "email":email}}, function(err,res){})
                req.session.passport.user.name = name;
                req.session.passport.user.username = username;
                req.session.passport.user.email = email;
                req.session.passport.user.deliveryAddress = deliveryAddress;
                req.session.passport.user.password = correctPassword;

                res.redirect('/profile/edit/success');
            }
        })
    }
 
}


exports.render_past_order = function (req,res){
    res.redirect("/home");
}
