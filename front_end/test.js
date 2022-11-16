const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs")
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy

var val0 = 0;
var val1 = 0;
var val2 = 0;
var val3 = 0;
var val4 = 0;


const app = express();
mongoose.connect("mongodb://localhost:27017/usersDB",{useNewUrlParser: true});
// This create user Data Base
// Which take user name and password
const userSchema = new mongoose.Schema({
  email : String,
  password : String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userSchema);
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret:"True",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({

    usernameField: 'email',

  },User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req,res){
  res.render("firstpage");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.post('/login',function(req,res){
  const user = new User({
    username:req.body.email,
    password:req.body.password
  });
  req.login(user,function(err){
    if(err){
      res.redirect('/login');
    }else{
      passport.authenticate("local")(req, res, function(){
          res.redirect('/home');
      });
    }
  })

});

app.delete('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

app.get("/register", function(req,res){
  res.render("register");
});

app.post('/register', function(req, res){
    User.register({username: req.body.email}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect('/login');
            });
        }
    });
});

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
  res.render("order",{val0:val0,val1:val1,val2:val2,val3:val3,val4:val4});
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

  res.redirect("order");
});

app.get("/checkout",function(req,res){
  res.render("checkout");
});
app.get("/menu",function(req,res){
  res.render("menu");
})

app.listen(3000,function(){
  console.log("Server is running on port 3000")
})
