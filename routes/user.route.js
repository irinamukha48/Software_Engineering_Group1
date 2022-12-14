const express = require('express');


const app = express();
const router = express.Router();

const User = require('../models/User');
const passport = require('passport');
const userController = require('../controllers/user.controller');

function checkNotAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return res.redirect('/home');
  }
   next();
}

/**
* route register POST request
*/
router.post('/register' , passport.authenticate('register',
{successRedirect: '/user/login',
failureRedirect: '/user/register',
failureFlash: true })
);
//router.post('/register' , userController.new_user)

/**
* route register GET request
*/
router.get("/register",checkNotAuthenticated,userController.render_registration);


/**
* route login POST request
*/
router.post('/login' , passport.authenticate('login',
{ successRedirect: '/home',
failureRedirect: '/user/login',
failureFlash: true }
));

/**
* route login GET request
*/
router.get("/login",checkNotAuthenticated ,userController.render_login);



module.exports = router;
