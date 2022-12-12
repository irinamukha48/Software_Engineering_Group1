const express = require('express');

const app = express();
const router = express.Router();

var set = require("es6-set");

const User = require('../models/User');
const vendorController = require("../controllers/vendor.controller");

function checkNotAuthenticated(req,res,next){
  if (!req.isAuthenticated()){
    return res.redirect('/home');
  }
  next();
}

router.get("/",checkNotAuthenticated,vendorController.renderVendorPage);

router.get("/createRestaurant",checkNotAuthenticated,vendorController.renderRestCreatePage);

router.post("/createRestaurant",checkNotAuthenticated,vendorController.createResturant);

router.get("/logout", function(req, res){
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
})

module.exports = router
