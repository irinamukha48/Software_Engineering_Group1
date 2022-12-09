const express = require('express');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const Review = require('../models/review');
var time = new Date().toLocaleTimeString(); // 11:18:48 AM

var twentyMinutesLater = new Date();
twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20)
var btime = twentyMinutesLater.toLocaleTimeString()


router.get("/",function(req,res){
  var name = req.user.name
  res.render("review",{time:time,name:name,actuallytime:btime})
})

router.post("/",function(req,res){
    var name = req.body.username
    var restaurantname = req.body.restaurantname
    var message  = req.body.usermessage
    CreateReview = Review({
      username      : name,
      email         : req.user.email,
      restaurantname: restaurantname,
      message       : message
    })
    CreateReview.save()
    res.redirect("/home")
})


module.exports = router;