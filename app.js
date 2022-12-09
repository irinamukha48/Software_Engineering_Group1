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
const client = require("twilio")(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);
const Restaurant = require('./models/restaurants');
const Order = require('./models/order');

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



//Route for Home Page
app.get('/', (req,res)=> {
    res.render("firstpage");
 })

//config for user route
const users = require('./routes/user.routes');
app.use('/user', users);

//config for resturant route
const resturants = require('./routes/resturant.route');
app.use('/resturants', resturants);

const review = require('./routes/review.routes');
app.use('/review', review);

/*
// This Display Template of any resturant
const acutalresturants = require('./routes/acutalresturants.route');
app.use('/resturants/',acutalresturants);

// config for checkout Route
const checkout = require('./routes/checkout.route');
app.use('/resturants/',checkout );

const checkoutsuccess = require('./routes/checkoutsuccess.route');
app.use('/resturants/',checkoutsuccess );
*/

//config for profile route
const profile = require('./routes/profile.route');
app.use('/profile',profile);

//config for about route
const about = require('./routes/about.route');
app.use('/about', about);

//config for contact page
const contact = require('./routes/contact.route');
app.use('/contact', contact);

/*
//config for Contact Success Page
const contactSuccess = require('./routes/contactSuccess.route');
app.use('/contact/Success', contactSuccess);
*/

//config for Vendor Page
const vendors = require('./routes/vendor.route');
app.use('/vendor', vendors);

/*
//config for Vendor Publish Page
const vendorPublish = require('./routes/vendorRestCreate.route');
app.use('/vendor/createRestaurant', vendorPublish);
*/


app.get("/logout", function(req, res){
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
})

//config home page for
app.get("/home",function(req,res){
    if (req.isAuthenticated()){
      res.render('home');
    }else{
     res.redirect('/user/login');
    }
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
