require("dotenv").config();

const db = require('./config/database');

const ejs = require("ejs");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const passport = require('passport');
const passportSetup = require('./config/passport-setup');

const resturantSetup = require("./seed/resturant.seeder"); // remove this once we have resturants in databse 

const client = require("twilio")(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);

PORT = 3000;

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 20}
}));


app.use(passport.initialize());
app.use(passport.session());

/**
* configuration for flash.
*/
app.use(flash());

var val0 = 0;
var val1 = 0;
var val2 = 0;
var val3 = 0;
var val4 = 0;
var val5 = 0;
var prod1 = val0;
var prod2 = val1;
var prod3 = val2;
var prod4 = val3;
var prod5 = val4;
var prod6 = val5;


/**
* Route for Home Page
*/
app.get('/', (req,res)=> {
    res.render("firstpage");
 })

/**
* config for user route
*/
const users = require('./routes/user.routes');
app.use('/user', users);

/**
* config for resturant route
*/
const resturants = require('./routes/resturant.routes');
app.use('/resturants', resturants);


/**
* config for about page
*/
app.get("/about",function(req,res){
    res.render('about');
});

/*
* config for contact page
*/
app.get('/contact',function(req,res){
    res.render("contact");
});

/*
* config home page for 
*/
app.get("/home",function(req,res){
    if (req.isAuthenticated()){
      res.render('home');
    }else{
     res.redirect('/user/login');
    }
});


app.get("/order",function(req,res){
    res.render("order",{val0:val0,val1:val1,val2:val2,val3:val3,val4:val4,val5:val5});
  });
  
  app.post("/order",function(req,res){
    if(req.body.hasOwnProperty("add")){
      val0 = val0 + 1;
    }
    if(req.body.hasOwnProperty("remove")){
      if (val0 > 0){
        val0 = val0 -1;
      }else{
        val0 = val0
      }
    }
    // Val 1
    if(req.body.hasOwnProperty("add1")){
      val1= val1 + 1;
    }
    if(req.body.hasOwnProperty("remove1")){
      if (val1 > 0){
        val1 = val1 -1;
      }else{
        val1 = val1
      }
    }
    // Val 2
    if(req.body.hasOwnProperty("add2")){
      val2= val2 + 1;
    }
    if(req.body.hasOwnProperty("remove2")){
      if (val2 > 0){
        val2 = val2 -1;
      }else{
        val2 = val2
      }
    }
    // Val 3
    if(req.body.hasOwnProperty("add3")){
      val3= val3 + 1;
    }
    if(req.body.hasOwnProperty("remove3")){
      if (val3 > 0){
        val3 = val3 -1;
      }else{
        val3 = val3
      }
    }
    // Val 4
    if(req.body.hasOwnProperty("add4")){
      val4= val4 + 1;
    }
    if(req.body.hasOwnProperty("remove4")){
      if (val4 > 0){
        val4 = val4 -1;
      }else{
        val4 = val4
      }
  
    }
    // Val 5
    if(req.body.hasOwnProperty("add5")){
      val5= val5 + 1;
    }
    if(req.body.hasOwnProperty("remove5")){
      if (val5 > 0){
        val5 = val5 -1;
      }else{
        val5 = val5
      }
  
    }
  
    res.redirect("order");
});
  
app.get("/checkout",function(req,res){
    name = req.body.firstname;
    console.log(name);
    res.render("checkout",{prod1:val0,prod2:val1,prod3:val2,prod4:val3,prod5:val4,prod6:val5});
});
  
app.get("/success",function(req,res){
  
    res.render('success');
    // This store Users ECE Fast Food to dataBases.
    /*const order = new Order({
       classicFires : val0,
       JuicyBurger  : val1,
       ChessyPizza  : val2,
       FriedChicken : val3,
       LeafySalad   : val4,
       SoftDrinks   : val5
    });
    order.save(function (err) {
    if (err) return handleError(err);
    // saved!
    or Can USE order.save()
  });*/
});
  
app.post("/checkout",function(req,res){
    var name = req.body.firstname;
    var address = req.body.address;
  
  /*client.messages
    .create({
       body: 'Thank You'+" "+name+" "+"For choosing ECE GrubHub. Your Order Will be delieved to"+" "+ address+" " +"in 20 to 30 Minutes",
       from: '+13464886958',
       to: '+1'
  });*/
  
    res.redirect("success");
});

/**
* The 404 route page
*/
app.get('*', function(req, res){
    res.status(404).redirect('/');
});

/**
* listen to port
*/
app.listen(PORT, ()=> {
    console.log('this application is wokring on port ' + PORT)
})