// These are All the libaries that we using for the project
require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs")
const session = require('express-session');
const passport = require("passport");
const flash = require('express-flash');
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require('method-override');
const LocalStrategy = require('passport-local').Strategy
const User = require(__dirname + '/models/user.js');
const Order = require(__dirname + '/models/order.js');


const client = require("twilio")(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);

// These Values Keep a Track
// Of Quantity of Product a Customer wants

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



const app = express();

mongoose.connect("mongodb://localhost:27017/usersDB",{useNewUrlParser: false});

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Verify is User info is correct
// or Wrong.

passport.use('register',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback:true
},
  function(req,email, password, done) {
      User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (user) { return done(null, false,{message:"This User is already Taken"}); }else{
          var newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err){
          if(err) throw err;
          return done(null,newUser);
      });
      }
      });
}));
passport.use('login',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback:true
},
  function(req,email, password, done) {
    User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false,{message:"This User Does not Exist"}); }
    if (!user.validPassword(password)) { return done(null, false,{message:"Wrong Password"}); }
    return done(null, user);
  });
  }
));
passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


app.get("/", function(req,res){
  res.render("firstpage");
});

app.get("/login",checkNotAuthenticated ,function(req,res){
  res.render("login");
});

app.post('/login',
  passport.authenticate('login', { successRedirect: '/home',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get("/logout",function(req, res){
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
});

app.get("/register",checkNotAuthenticated,function(req,res){
  res.render('register');
});

app.post('/register',
  passport.authenticate('register', { successRedirect: '/login',
                                   failureRedirect: '/register',
                                   failureFlash: true })
);

app.get("/home",function(req,res){
  if (req.isAuthenticated()){
    res.render('home');
  }else{
    res.redirect('/login');
  }

});

app.get("/about",function(req,res){
  res.render('about');
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
app.get("/restaurant",function(req,res){
  res.render("restaurant");
});

app.get('/profile',function(req,res){
  res.render("profile");
});

app.get('/contact',function(req,res){
  res.render("contact");
});

function checkNotAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return res.redirect('/home');
  }
   next()
}

app.listen(3000,function(){
  console.log("Server is running on port 3000")
})
