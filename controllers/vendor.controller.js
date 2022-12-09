const User = require('../models/User');
const Restaurant = require('../models/restaurants');

exports.renderVendorPage = function (req,res) {
    var userInfo = req.user.email
    User.findOne({email:userInfo},function(err,foundUser){
    if(foundUser.vendor === "no"){
      console.log("For Vendors Only")
      res.redirect('home')
    }else{
      res.render("vendor")
    }
  })
}

exports.renderRestCreatePage = function (req,res) {
    var userInfo = req.user.email
    User.findOne({email:userInfo},function(err,foundUser){
    if(foundUser.vendor === "no"){
      res.redirect("home")
    }else{
      res.render("vendorResCreate")
    }
  })
}

exports.createResturant = function (req,res) {
    var restaurantName = req.body.restaurantname;
               // Product One
  var prodOnename = req.body.productOneName;
  var prodOnePrice = Number(req.body.productOnePrice).toFixed(2);
  var prodOneimageurl = req.body.productOneImageurl;
                // Product Two
  var prodTwoname = req.body.productTwoName;
  var prodTwoPrice = Number(req.body.productTwoPrice).toFixed(2);
  var prodTwoimageurl = req.body.productTwoImageurl;
                // Product Three
  var prodThreename = req.body.productThreeName;
  var prodThreePrice = Number(req.body.productThreePrice).toFixed(2);
  var prodThreeimageurl = req.body.productThreeImageurl;
                 //Product Four
  var prodFourname = req.body.productFourName;
  var prodFourPrice = Number(req.body.productFourPrice).toFixed(2);
  var prodFourimageurl = req.body.productFourImageurl;
                 // Product Five
  var prodFivename = req.body.productFiveName;
  var prodFivePrice = Number(req.body.productFivePrice).toFixed(2);
  var prodFiveimageurl = req.body.productFiveImageurl;
                // Product Six
  var prodSixname = req.body.productSixName;
  var prodSixPrice = Number(req.body.productSixPrice).toFixed(2);
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
  res.render("vendorSuccess",{Subject:"Your"+" "+restaurantName+" "+"have been successfully upload to ECE GRUBHUB.",
                          message:"As Always Thank you choosing Rutgers ECE "});
}