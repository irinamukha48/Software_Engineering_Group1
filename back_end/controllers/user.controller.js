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