const Resturant = require('../models/Resturant');
const { check, validationResult } = require('express-validator');
const { Types } = require('mongoose');

exports.all_resturant = function(req,res) {

    Resturant.find({} , (err,resturant) =>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            if(resturant)
            {
                res.send(resturant)
            }
            else
            {
                console.log("NO resturants in collection")
                console.log(resturant)
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