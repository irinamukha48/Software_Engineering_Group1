const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

var creditcardutils = require('creditcardutils');// Libary
const { check, validationResult } = require('express-validator');
app.use(bodyParser.urlencoded({ extended: true }));

const Restaurant = require('../models/restaurants');
const Order = require('../models/order');

router.get("/:customResturants/checkout",function(req,res){
  var customResturants = req.params.customResturants
  var customcheckout   = req.params.customcheckout

  Restaurant.findOne({restaurantName:customResturants},function(err,found){
    Order.findOne({restaurantname:customResturants},function(err,founditems){
        //console.log(founditems)
        res.render("checkout",
        {prod1:founditems.productOnequality,  prod2:founditems.productTwoquality,
         prod3:founditems.productThreequality,prod4:founditems.productFourquality,
         prod5:founditems.productFivequality, prod6:founditems.productSixquality,
         action:"/resturants/"+customResturants+"/checkout",
         productOne:found.productOneimageurl,
         productTwo:found.productTwoimageurl,
         productThree:found.productThreeimageurl,
         productFour:found.productFourimageurl,
         productFive:found.productFiveimageurl,
         productSix:found.productSiximageurl})
      })
  })
})



module.exports = router;
