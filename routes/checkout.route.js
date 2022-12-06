const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

const Restaurant = require('../models/restaurants');
const Order = require('../models/order');

router.get("/:customResturants/checkout",function(req,res){
  const customResturants = req.params.customResturants
  const customcheckout   = req.params.customcheckout

  Order.findOne({restaurantname:customResturants},function(err,founditems){
      //console.log(founditems)
      res.render("checkout",
      {prod1:founditems.productOnequality,  prod2:founditems.productTwoquality,
       prod3:founditems.productThreequality,prod4:founditems.productFourquality,
       prod5:founditems.productFivequality, prod6:founditems.productSixquality,
       actionVal:"/resturants/"+customResturants+"/checkout",
       productOne:"https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png",
       productTwo:"https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png",
       productThree:"https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png",
       productFour:"https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png",
       productFive:"https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png",
       productSix:"https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png"})
    })

})

module.exports = router;
