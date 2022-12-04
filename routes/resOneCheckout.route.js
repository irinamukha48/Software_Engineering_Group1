const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
var creditcardutils = require('creditcardutils');// Libary
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true}));

const Order = require('../models/order');
const UserOrder = require('../models/UserOrder');


router.get("/",function(req,res){

    Order.findOne({},function(err,founditems){
      //console.log(founditems);
      res.render("checkout",{prod1:founditems.classicFires
        ,prod2:founditems.JuicyBurger,
        prod3:founditems.ChessyPizza,
        prod4:founditems.FriedChicken,
        prod5:founditems.LeafySalad,
        prod6:founditems.SoftDrinks});
    })
      
    });

router.post("/",
// Checking The First Name
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
.isLength({ min: 1, max: 22 })
,
// Checking The Delivery Address
check("address"," ")
.notEmpty()
.withMessage('Address required')
.isLength({min: 3,max:32})       
.matches('[0-9]').withMessage('Enter a Valid Delivery Address') //has Number
.matches('[a-z]').withMessage('Enter a Valid Delivery Address') //Also has Letters
,
// Checking The Name on the card
check("NameOnCard"," ")
.isLength({ min: 3, max: 22 })
.matches('[a-z]').withMessage('Name One the Card must be alphabetic and 3 characters Long')
,
function(req,res){

  var FirstName   =  req.body.firstname;
  var LastName    =  req.body.lastname;
  var Email       =  req.body.emailaddress;
  var address     =  req.body.address;
  var NameOnCard  =  req.body.NameOnCard;
  var CardNumber  =  req.body.cardNumber;
  var month       =  req.body.month;
  var year        =  req.body.year;
  var cvv         =  req.body.cvv;
  var restaurentName = "Rutgers ECE Fast Food"
  var price = 20;

const errors = validationResult(req);
if(!errors.isEmpty()){
  errors.array().forEach(error=>{
    req.flash('error',error.msg)
    console.log(error.msg)
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
    Order.findOne({id:8},function(err,founditems){
      if (err){
        //console.log(err)
    }else{
        //console.log("Result :", result) 
    }
      var UserOrdertest = UserOrder({
        email          : Email,
        name           : FirstName,
        restaurentName : restaurentName,
        address        : address,
        classicFires   : founditems.classicFires,
        JuicyBurger    : founditems.JuicyBurger,
        ChessyPizza    : founditems.ChessyPizza,
        FriedChicken   : founditems.FriedChicken,
        LeafySalad     : founditems.LeafySalad,
        SoftDrinks     : founditems.SoftDrinks,
        price          : price
      })
      UserOrdertest.save();
      res.redirect("success");

    })
    
  }
  
})



module.exports = router;