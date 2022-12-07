const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

router.get("/:customResturants/checkout/success",function(req,res){
  var customResturants = req.params.customResturants
  var ordernumber = Math.floor(Math.random()*10000)+1000;

   res.render("success",{Subject:"Hi," + " "+"your Order Number is:"+" "+"ECE"+ordernumber,
   message:"As Always Thank you for choosing ECE GRUBHUB" })
});

module.exports = router;
