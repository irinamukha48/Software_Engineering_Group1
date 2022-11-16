const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
//const { check, validationResult } = require('express-validator/check')
const resturantController = require('../controllers/resturant.controller')

/*
* route resturants GET route
*/
router.get("/",resturantController.all_resturant)

/*
* route single resturant GET route
*/
router.get("/:id",resturantController.find_resturant_by_id)

module.exports = router