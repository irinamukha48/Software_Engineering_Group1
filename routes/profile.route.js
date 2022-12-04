const express = require('express');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
const Order = require('../models/order');

var email
router.get('/',function(req,res){
  email = req.user.email
  res.render("profile",{name:email});
  
});

router.post("/",function(req,res){
  res.redirect("profile");
});

module.exports = router;
