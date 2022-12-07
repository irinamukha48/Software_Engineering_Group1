const User = require('../models/User');
const { check, validationResult } = require('express-validator')


exports.render_registration = function(req,res) {
    res.render('register', {
        errors: req.flash('errors'),
        error: req.flash('error')
    })
}

exports.render_login = function(req,res) {
    res.render('login', {
        errors: req.flash('errors'),
        error: req.flash('error')
    })
}
