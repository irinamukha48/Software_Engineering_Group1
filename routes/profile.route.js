const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');
router.use(bodyParser.urlencoded({ extended: true }));

const User = require('../models/User');
const Order = require('../models/order');



router.get('/',function(req,res){

  if(req.isAuthenticated()){
    res.render("profile",{user:req.user});
  }else{
    console.log("Not a Authenticated User")
    res.redirect('/user/login')
  }


});

router.post("/",function(req,res){
  res.redirect("profile");
});

module.exports = router;
