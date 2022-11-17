const Resturant = require('../models/Resturant');
const { check, validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { reset } = require('nodemon');

exports.all_resturant = function(req,res) {

    Resturant.find({} , (err,resturant) =>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(resturant)
            {
                res.send(resturant);
                res.render("restaurant");
            }
            else
            {
                console.log("NO resturants in collection");
            }

        }
    })
}

exports.find_resturant_by_id = function(req,res) {

    Resturant.findOne({_id: Types.ObjectId(req.params.id)}, (err,resturant)=> {
        

        if(!err) {
        
        // send resturant    
        if(resturant)
        {

            res.send(resturant)

            /*
            res.render('resturant/:id', {
                resturant: resturant,
                title: "single resturant"
            })
            */
        }
        else{
            console.log("NO such Resturant")
            res.redirect("/resturants")
        }
 
        } else {
            console.log(err)
        }
     
     })
  
}

exports.render_resturants = function(req,res) {
    res.render('restaurant', {
        errors: req.flash('errors'),
        error: req.flash('error')
    })
}