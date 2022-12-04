const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true}));
const mongoose = require('mongoose');

const User = require('../models/User');
const Order = require('../models/order');

router.get('/',function(req,res){
  Order.find({},function(err,foundOrders){
    //console.log(foundOrders);
    //res.render("profile",{name:"Testing",orders:foundOrders});
  })
  res.render("profile");
  
});

router.post("/",function(req,res){
  
  console.log("hello"+req.body.firstname);
  res.redirect("profile");
});

module.exports = router;
