const User = require('../models/User');
const Order = require('../models/order');
const { check, validationResult } = require('express-validator');
const { ConnectionPolicyPage } = require('twilio/lib/rest/voice/v1/connectionPolicy');
const e = require('connect-flash');

const bcrypt = require('bcrypt');

const UserOrder = require('../models/UserOrder');

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
                UserOrder.findOneAndUpdate({email:req.user.email},{ "$set": {"email":email}}, function(err,res){})
                Order.findOneAndUpdate({email:req.user.email},{ "$set": {"username": username, "email":email}}, function(err,res){})
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
    UserOrder.find({email:req.user.email} , function (err,foundOrders){

        let orders = foundOrders;

        const orderItems = [];

        if(err)
        {
            req.flash(err);
        }

        if(foundOrders)
        {   

            for(i = 0; i<orders.length; i++)
            {
                orderItems[i] = {"Product" : [], "Quantity" : []};
                var l =0;

                for (var j in orders[i])
                {
                    if(j.includes("product"))
                    {  
                        if(j.includes("name"))
                        {
                            var quantity;
                            var done = false
                            
                            for (k in orders[i]){

                                if(done)
                                {
                                quantity = orders[i][k];
                                break;  
                                }

                                if(k == j)
                                {
                                    done = true;
                                }
                                
                            }

                            if(quantity != 0)
                            {
                                orderItems[i].Product[l] = orders[i][j];
                                console.log("name : " + orders[i][j]);
                            } 
                            
                        }
                        else if (j.includes("quantity"))
                        {
                            if(orders[i][j] != 0)
                            {
                                orderItems[i].Quantity[l] = orders[i][j];
                                console.log("quant : " + orders[i][j]);
                                l++;
                            }   
                        }
                        
                    }
                    
                }
                
            }
        }

        res.render("pastOrders",{pastOrders:orders,items:orderItems})



    });
}
