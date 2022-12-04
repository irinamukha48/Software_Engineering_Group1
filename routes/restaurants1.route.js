const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const Order = require('../models/order');


router.get("/",function(req,res){

  const resOne = Order({
    classicFires : 0,
    JuicyBurger  : 0,
    ChessyPizza  : 0,
    FriedChicken : 0,
    LeafySalad   : 0,
    SoftDrinks   : 0
  })
  resOne.save();

  Order.findOne({},function(err,founditems){
    res.render("order",{val0:founditems.classicFires
      ,val1:founditems.JuicyBurger,
      val2:founditems.ChessyPizza,
      val3:founditems.FriedChicken,
      val4:founditems.LeafySalad,
      val5:founditems.SoftDrinks});
    
   })

});

  router.post("/",function(req,res){
    if(req.body.hasOwnProperty("add")){
      Order.findOne({},function(err,founditems){
        Order.updateOne({},{classicFires:founditems.classicFires+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result) 
          }
      });
        
      });
      
    }
    
    if(req.body.hasOwnProperty("remove")){
      Order.findOne({},function(err,founditems){
        if (founditems.classicFires>0){
          Order.updateOne({},{classicFires:founditems.classicFires-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result) 
            }
        });
        }
      });
    }
    // Val 1
    if(req.body.hasOwnProperty("add1")){
      Order.findOne({},function(err,founditems){
        Order.updateOne({},{JuicyBurger:founditems.JuicyBurger+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result) 
          }
      });
        
      });
    }
    if(req.body.hasOwnProperty("remove1")){
      Order.findOne({},function(err,founditems){
        if (founditems.JuicyBurger>0){
          Order.updateOne({},{JuicyBurger:founditems.JuicyBurger-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result) 
            }
        });
        }
      });
     
    }
    // Val 2
    if(req.body.hasOwnProperty("add2")){
      Order.findOne({},function(err,founditems){
        Order.updateOne({},{ChessyPizza:founditems.ChessyPizza+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result) 
          }
      });
        
      });
    }
    if(req.body.hasOwnProperty("remove2")){
      Order.findOne({},function(err,founditems){
        if (founditems.ChessyPizza>0){
          Order.updateOne({},{ChessyPizza:founditems.ChessyPizza-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result) 
            }
        });
        }
      });
    }
    // Val 3
    if(req.body.hasOwnProperty("add3")){
      Order.findOne({},function(err,founditems){
        Order.updateOne({},{FriedChicken:founditems.FriedChicken+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result) 
          }
      });
        
      });
    }
    if(req.body.hasOwnProperty("remove3")){
      Order.findOne({},function(err,founditems){
        if (founditems.FriedChicken>0){
          Order.updateOne({},{FriedChicken:founditems.FriedChicken-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result) 
            }
        });
        }
      });
    }
    // Val 4
    if(req.body.hasOwnProperty("add4")){
      Order.findOne({},function(err,founditems){
        Order.updateOne({},{LeafySalad:founditems.LeafySalad+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result) 
          }
      });
        
      });
    }
    if(req.body.hasOwnProperty("remove4")){
      Order.findOne({},function(err,founditems){
        if (founditems.LeafySalad>0){
          Order.updateOne({},{LeafySalad:founditems.LeafySalad-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result) 
            }
        });
        }
      });

    }
    // Val 5
    if(req.body.hasOwnProperty("add5")){
      Order.findOne({},function(err,founditems){
        Order.updateOne({},{SoftDrinks:founditems.SoftDrinks+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result) 
          }
      });
        
      });
    }
    if(req.body.hasOwnProperty("remove5")){
      Order.findOne({},function(err,founditems){
        if (founditems.SoftDrinks>0){
          Order.updateOne({},{SoftDrinks:founditems.SoftDrinks-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result) 
            }
        });
        }
      });

      
    }
    res.redirect("order");
});


module.exports = router;