const User = require('../models/User');
const { check, validationResult } = require('express-validator')



exports.find_user_by_id = function(req,res) {

    User.findOne({_id: req.params.id}, (err,user)=> {
        
        if(!err) {
            
         //send user's info
 
        } else {
            console.log(err)
        }
     
     })
  
}

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