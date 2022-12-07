require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true}));



let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASS
  }
});


router.get('/',function(req,res){
  res.render("contact");
});

router.post("/",
check("name")
.isAlpha()
.withMessage('Full Name must be alphabetic'),

// Checking The Email Address
check("email",'Invalid email address ')
.isEmail()

,
//Checking Phone Number
check("phoneNumber")
.isInt()
.withMessage("Only Integer are Allowed")

,function(req,res){
  var emailaddress = req.body.email;
  let mailDetails = {
    from: process.env.USER_NAME,
    to: emailaddress,
    subject: 'ECE GRUBHUB',
    text: 'Sorry'+" "+req.body.name+" "+'for the Inconvenience. One of Our Team member is working to resolve your issue. Thank you for your patience and for choosing ECE GRUBHUB.'
  };
  const errors = validationResult(req);
if(!errors.isEmpty()){
  errors.array().forEach(error=>{
    req.flash('error',error.msg)
    console.log(error.msg)
  })
  res.redirect("contact")
}else{
  
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
})
res.redirect("/contact/Success");
}

})

router.get("/Success",function(req,res){
  res.render("contactSuccess");
});

module.exports = router;
