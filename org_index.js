

// All the libary that we are using
const express = require("express");
const http = require("https");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');


const app = express();
mongoose.connect("mongodb://localhost:27017/usersDB",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));


// This create user Data Base
// Which take user name and password
const userSchema = new mongoose.Schema({
  email: String,
  password : String
});

const User = mongoose.model("User",userSchema);



//This Send HTML and CSS togther
app.use(express.static(__dirname + '/public'));

// This are all calls that are make
// which users to different pages.


// All The request that users make


app.get("/", (req,res) => {
  res.sendFile(__dirname +"/newuser.html");
})

app.get("/login", (req,res) => {
  res.sendFile(__dirname +"/login.html");
})

app.post("/login", async(req,res) => {
   // This is where, the new user make account
   try{
     var hashedpassword = await bcrypt.hash(req.body.password,10);
     var newuser = req.body.email;
     const user = new User({
       email: newuser,
       password: hashedpassword
     });
     //user.save()
     console.log(newuser)
     res.redirect('/login')
   }catch{
     res.redirect('/register')

   }
  // "user.save()" will save same user and password again and again

})


app.get("/register", (req,res) => {
  res.sendFile(__dirname +"/createuser.html");
})
app.post("/register", (req,res) => {
  res.sendFile(__dirname +"/createuser.html");
})

app.get("/login/home",(req,res )=> {
  res.sendFile(__dirname +"/homepage.html");
})



app.listen(3000,function(){
  console.log("Server is running on port 3000")
})
