require('dotenv').config( )
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const saltRound = 10;

app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/usersDB",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));

// This create user Data Base
// Which take user name and password
const userSchema = new mongoose.Schema({
  email : String,
  password : String
});



const User = new mongoose.model("User",userSchema);


app.get("/", (req,res) => {
  res.sendFile(__dirname +"/newuser.html");
})

app.get("/register",function(req,res){
  res.sendFile(__dirname +"/createuser.html");
})

app.post('/register',function(req,res){
  bcrypt.hash(req.body.password,saltRound,function(err,hash){
    const newUser = new User({
      email: req.body.email,
      password: hash
    });
    newUser.save(function(err){
      if (err){
        console.log(err)
      }else{
        res.redirect('/login')
      }
    });

  });

});

app.get('/login',function(req,res){
  res.sendFile(__dirname +"/login.html");
})

app.post('/login',function(req,res){
  const new_user = req.body.email;
  const password = req.body.password;
  User.findOne({email:new_user},function(err,foundUser){
    if (err){
      console.log(err);
    }else{
      if(foundUser){
        bcrypt.compare(password,foundUser.password,function(err,result){
          if (result === true)
          res.redirect('/login/home')
          else{
            res.redirect('/login')
          }
        });
        }
      }
  });
});

app.get('/login/home',function(req,res){
  res.sendFile(__dirname +"/homepage.html");
});


app.listen(3000,function(){
  console.log("Server is running on port 3000")
})
