const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

const Restaurant = require('../models/restaurants');
var items = []


router.get('/',function(req,res){
  Restaurant.findOne({},function(err,foundrestaurant){
    var action = "/resturants/"+foundrestaurant.restaurantName
    if(foundrestaurant=== null ){
      if(items.length==0){
        items.push("No Restaurant Free")
        console.log(foundrestaurant.restaurantName)
        res.render("restaurant",{newListItems:items,actionVal:""});
      }else if(items.length==1 ||foundrestaurant ===null){
        console.log(foundrestaurant.restaurantName)
        res.render("restaurant",{newListItems:items,actionVal:action});
      }
    }else{
      if(items.length==0){
        items.push(foundrestaurant.restaurantName)
        console.log(foundrestaurant.restaurantName)
        res.render("restaurant",{newListItems:items,actionVal:action});
      }
      else if(items.length==1 ||foundrestaurant !=null){
        console.log(foundrestaurant.restaurantName)
        res.render("restaurant",{newListItems:items,actionVal:action});
      }
    }

  })


});



module.exports = router;
