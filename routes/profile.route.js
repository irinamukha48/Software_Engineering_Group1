const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');
router.use(bodyParser.urlencoded({ extended: true }));

const User = require('../models/User');
const Order = require('../models/order');
const userController = require('../controllers/user.controller');

function checkNotAuthenticated(req,res,next){
  if (!req.isAuthenticated()){
    return res.redirect('/home');
  }
  next();
}

router.get('/',checkNotAuthenticated,userController.user_profile);

router.get('/edit',checkNotAuthenticated,userController.render_edit_profile);

router.post('/edit',checkNotAuthenticated,userController.edit_profile)

module.exports = router;
