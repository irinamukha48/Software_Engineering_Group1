const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));


var creditcardutils = require('creditcardutils');// Libary
const { check, validationResult } = require('express-validator');

const Restaurant = require('../models/restaurants');
const Order = require('../models/order');
const UserOrder = require('../models/userorder');
var ordernumber = Math.floor(Math.random()*10000)+1000;

router.get("/:customResturants/checkout",function(req,res){
  var customResturants = req.params.customResturants
  var customcheckout   = req.params.customcheckout
  var name = req.user.name
  Restaurant.findOne({restaurantName:customResturants},function(err,found){
    Order.findOne({username:name},function(err,founditems){

        res.render("checkout",
        {prod1:founditems.productOnequantity,  prod2:founditems.productTwoquantity,
         prod3:founditems.productThreequantity,prod4:founditems.productFourquantity,
         prod5:founditems.productFivequantity, prod6:founditems.productSixquantity,
         action:"/resturants/"+customResturants+"/checkout",
         checkout:"/resturants/"+customResturants+"/checkout",
         productOne:found.productOneimageurl,
         productTwo:found.productTwoimageurl,
         productThree:found.productThreeimageurl,
         productFour:found.productFourimageurl,
         productFive:found.productFiveimageurl,
         productSix:found.productSiximageurl,
         total:founditems.bill})
      })
  })
})

router.post("/:customResturants/checkout",
check("firstname")
.isLength({ min: 1, max: 15 })
.isAlpha()
.withMessage('First Name must be alphabetic')
,
// Checking The Last Name
check('lastname')
.isLength({ min: 1, max: 15 })
.isAlpha()
.withMessage('Last Name must be alphabetic')
,
// Checking The Email Address
check("emailaddress",'Invalid email address ')
.isEmail()
.isLength({ min: 1, max: 50 })
,
// Checking The Delivery Address
check("address"," ")
.notEmpty()
.withMessage('Address required')
.isLength({min: 3,max:50})
.matches('[0-9]').withMessage('Enter a Valid Delivery Address') //has Number
.matches('[a-z]').withMessage('Enter a Valid Delivery Address') //Also has Letters
,
// Checking The Name on the card
check("NameOnCard"," ")
.isLength({ min: 3, max: 22 })
.matches('[a-z]').withMessage('Name One the Card must be alphabetic and 3 characters Long')
,

function(req,res){
  var customResturants = req.params.customResturants
  var customcheckout   = req.params.customcheckout
  var name = req.user.name

  Order.findOne({username:name},function(err,found){
    var FirstName       =  req.body.firstname;
    var LastName        =  req.body.lastname;
    var Email           =  req.body.emailaddress;
    var address         =  req.body.address;
    var NameOnCard      =  req.body.NameOnCard;
    var CardNumber      =  req.body.cardNumber;
    var month           =  req.body.month;
    var year            =  req.body.year;
    var cvv             =  req.body.cvv;
    var restaurentName  = found.restaurantname;
    var price = found.bill;


  const errors = validationResult(req);
  if(!errors.isEmpty()){
    errors.array().forEach(error=>{
      //req.flash('error',error.msg)
      //console.log(error.msg)
    })


  }

    if (creditcardutils.validateCardNumber(CardNumber)=== false){
       console.log("Invalid Credit Card Number");
       res.redirect("checkout");
    }
    else if (creditcardutils.validateCardCVC(cvv) === false){
       console.log("Invalid CVV Number");
       res.redirect("checkout");
    }
    else if (creditcardutils.validateCardExpiry(month,year)=== false){
      console.log("Invalid Expiration Date");
      res.redirect("checkout");
    }else{

      let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.PASS
        }
      });
      let mailDetails = {
        from: process.env.USER_NAME,
        to: Email,
        subject: 'ECE GRUBHUB',
        text: 'Hi,'+" "+name+" "+'Thank you for choosing'+" "+found.restaurantname+" "+"resturant. We are currently preparing your food and the estimated time to up is xyz.Your"+" "+"Order Number is"+" "+"ECE"+ordernumber+"."+" "+"Thank You for choosing ECE GRUBHUB."
      };
      var CreateOrder = UserOrder({
        restaurantname      : restaurentName,
        email               : Email,
        ordernumber         : "ECE"+ordernumber,
        username            : FirstName+" "+LastName,
        deliveryaddress     : address,
        productOnename      : found.productOnename,
        productOnequantity  : found.productOnequantity,
        productTwoname      : found.productTwoname,
        productTwoquantity  : found.productTwoquantity,
        productThreename    : found.productThreename,
        productThreequantity: found.productThreequantity,
        productFourname     : found.productFourname,
        productFourquantity : found.productFourquantity,
        productFivename     : found.productFivename,
        productFivequantity : found.productFivequantity,
        productSixname      : found.productSixname,
        productSixquantity  : found.productSixquantity,
        bill                : found.bill
      })
      CreateOrder.save()
      mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    })
      res.redirect("/resturants/"+customResturants+"/checkout/success")

    }
    //res.redirect("/resturants/"+customResturants+"/checkout/success")
  })

  })



module.exports = router;

//res.redirect("/resturants/"+customResturants+"/checkout/success")
