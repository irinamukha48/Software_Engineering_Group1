const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

const Restaurant = require('../models/restaurants');
const Order = require('../models/order');
const UserOrder = require('../models/userorder');

router.get("/:customResturants/checkout/success",function(req,res){
  var customResturants = req.params.customResturants
  var name =  req.user.name

  UserOrder.findOne({username:name},function(err,result){
    res.render("success",{Subject:"Hi,"+" "+name+" "+"your Order Number is:"+" "+result.ordernumber,
    message:"As Always Thank you for choosing ECE GRUBHUB" })
  })


});

module.exports = router;
