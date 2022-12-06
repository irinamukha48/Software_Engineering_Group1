const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

const Restaurant = require('../models/restaurants');
var items = []


router.get('/',function(req,res){
  Restaurant.findOne({},function(err,foundrestaurant){
    if(foundrestaurant=== null ){
      if(items.length==0){
        items.push("No Restaurant Free")
        res.render("restaurant",{newListItems:items});
      }else if(items.length==1 ||foundrestaurant ===null){
        res.render("restaurant",{newListItems:items});
      }
    }else{
      if(items.length==0){
        items.push(foundrestaurant.restaurantName)
        res.render("restaurant",{newListItems:items});
      }
      else if(items.length==1 ||foundrestaurant !=null){
        res.render("restaurant",{newListItems:items});
      }
    }

  })


});



module.exports = router;
