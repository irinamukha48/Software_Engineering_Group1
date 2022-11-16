const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
//const { check, validationResult } = require('express-validator/check')
const userController = require('../controllers/user.controller')

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) 
      return next()

    //res.redirect('/users/login')
}


/**
* route register POST request
*/
router.post('/register' , passport.authenticate('register'))
//router.post('/register' , userController.new_user)

/**
* route login POST request
*/
router.post('/login' , passport.authenticate('login'))


module.exports = router