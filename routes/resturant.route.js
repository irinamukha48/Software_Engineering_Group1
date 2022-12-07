const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();
const { check, validationResult } = require('express-validator');

const resturantController = require('../controllers/resturant.controller');

function checkNotAuthenticated(req,res,next){
  if (!req.isAuthenticated()){
    return res.redirect('/home');
  }
  next();
}

router.get('/',checkNotAuthenticated,resturantController.all_resturant);

router.get('/:customListName',checkNotAuthenticated,resturantController.render_resturant);

router.post('/:customListName',checkNotAuthenticated,resturantController.modify_order);

router.get("/:customResturants/checkout",checkNotAuthenticated,resturantController.render_checkout_order)

router.post("/:customResturants/checkout",checkNotAuthenticated,
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
resturantController.link_order_and_user)

router.get("/:customResturants/checkout/success",checkNotAuthenticated,resturantController.render_success);

module.exports = router;
