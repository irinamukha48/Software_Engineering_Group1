const express = require('express');

const app = express();
const router = express.Router();

const User = require('../models/User');

router.get("/",function(req,res){
  var userInfo = req.user.email
  User.findOne({email:userInfo},function(err,foundUser){
    if(foundUser.vendor === "no"){
      console.log("For Vendors Only")
      res.redirect('home')
    }else{
      res.render("vendor")
    }
  })

})

module.exports = router
