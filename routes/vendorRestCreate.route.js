const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

var set = require("es6-set");
const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const Restaurant = require('../models/restaurants');
const User = require('../models/User');


router.get("/",function(req,res){
  var userInfo = req.user.email
  User.findOne({email:userInfo},function(err,foundUser){
    if(foundUser.vendor === "no"){
      res.redirect("home")
    }else{
      res.render("vendorResCreate")
    }
  })

})

router.post("/",function(req,res){

  var restaurantName = req.body.restaurantname;
               // Product One
  var prodOnename = req.body.productOneName;
  var prodOnePrice = req.body.productOnePrice;
  var prodOneimageurl = req.body.productOneImageurl;
                // Product Two
  var prodTwoname = req.body.productTwoName;
  var prodTwoPrice = req.body.productTwoPrice;
  var prodTwoimageurl = req.body.productTwoImageurl;
                // Product Three
  var prodThreename = req.body.productThreeName;
  var prodThreePrice = req.body.productThreePrice;
  var prodThreeimageurl = req.body.productThreeImageurl;
                 //Product Four
  var prodFourname = req.body.productFourName;
  var prodFourPrice = req.body.productFourPrice;
  var prodFourimageurl = req.body.productFourImageurl;
                 // Product Five
  var prodFivename = req.body.productFiveName;
  var prodFivePrice = req.body.productFivePrice;
  var prodFiveimageurl = req.body.productFiveImageurl;
                // Product Six
  var prodSixname = req.body.productSixName;
  var prodSixPrice = req.body.productSixPrice;
  var prodSiximageurl = req.body.productSixImageurl;

  var CreateRestaurant = Restaurant({
    restaurantName:     restaurantName,
    restaurantaddress:  "57 test Ave",

    productOneName:      prodOnename,
    productOnePrice:     prodOnePrice,
    productOneimageurl:  prodOneimageurl,

    productTwoName:       prodTwoname,
    productTwoPrice:      prodTwoPrice,
    productTwoimageurl:   prodTwoimageurl,

    productThreeName:     prodThreename,
    productThreePrice:    prodThreePrice,
    productThreeimageurl: prodThreeimageurl,

    productFourName:      prodFourname,
    productFourPrice:     prodFourPrice,
    productFourimageurl:  prodFourimageurl,

    productFiveName:      prodFivename,
    productFivePrice:     prodFivePrice,
    productFiveimageurl:  prodFiveimageurl,

    productSixName:       prodSixname,
    productSixPrice:      prodSixPrice,
    productSiximageurl:   prodSiximageurl

  });

  CreateRestaurant.save();
  console.log("restaurant have successfully created")
  res.render("success",{Subject:"Your"+" "+restaurantName+" "+"have been successfully upload to ECE GRUBHUB.",
                          message:"As Always Thank you choosing Rutgers ECE "});

})

module.exports = router
