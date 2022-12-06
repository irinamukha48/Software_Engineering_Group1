const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

const Restaurant = require('../models/restaurants');
const Order = require('../models/order');

router.get("/:customListName",function(req,res){
  const customListName = req.params.customListName

  Restaurant.findOne({restaurantName:customListName},function(err,foundrestaurant){
  /*  UserInCart = Order({
      restaurantname     : foundrestaurant.restaurantName,
      productOnename     : foundrestaurant.productOneName,
      productOnequality  : 0,
      productTwoname     : foundrestaurant.productTwoName,
      productTwoquality  : 0,
      productThreename   : foundrestaurant.productThreeName,
      productThreequality: 0,
      productFourname    : foundrestaurant.productFourName,
      productFourquality : 0,
      productFivename    : foundrestaurant.productFiveName,
      productFivequality : 0,
      productSixname    : foundrestaurant.productSixName,
      productSixquality : 0,
    })
    UserInCart.save()*/
    Order.findOne({restaurantname:customListName},function(err,found){
      res.render("restFour",{restaurantname:foundrestaurant.restaurantName,
      productOne:foundrestaurant.productOneName,
      productOneQuality: found.productOnequality,
      productOneImage:foundrestaurant.productOneimageurl,

      productTwo:foundrestaurant.productTwoName,
      productTwoQuality:found.productTwoquality,
      productTwoImage:foundrestaurant.productTwoimageurl,

      productThree:foundrestaurant.productThreeName,
      productThreeQuality:found.productThreequality,
      productThreeImage: foundrestaurant.productThreeimageurl,

      productFour:foundrestaurant.productFourName,
      productFourQuality:found.productFourquality,
      productFourImage:foundrestaurant.productFourimageurl,

      productFive:foundrestaurant.productFiveName,
      productFiveQuality:found.productFivequality,
      productFiveImage:foundrestaurant.productFiveimageurl,

      productSix:foundrestaurant.productSixName,
      productSixQuality:found.productSixquality,
      productSixImage:foundrestaurant.productSiximageurl,


      actionVal:'/resturants/'+customListName
    })
    })

  })


})
router.post('/:customListName',function(req,res){
  const customListName = req.params.customListName
  if(req.body.hasOwnProperty("add")){
    Order.findOne({restaurantname:customListName},function(err,founditems){
      Order.updateOne({restaurantname:customListName},{productOnequality:founditems.productOnequality+1}, function (err, result) {
        if (err){
            //console.log(err)
        }else{
            //console.log("Result :", result)
        }
    });

    });
}
if(req.body.hasOwnProperty("remove")){
      Order.findOne({restaurantname:customListName},function(err,founditems){
        if (founditems.productOnequality>0){
          Order.updateOne({restaurantname:customListName},{productOnequality:founditems.productOnequality-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result)
            }
        });
        }
      });
    }

    if(req.body.hasOwnProperty("add1")){
      Order.findOne({restaurantname:customListName},function(err,founditems){
        Order.updateOne({restaurantname:customListName},{productTwoquality:founditems.productTwoquality+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result)
          }
      });

      });
  }
  if(req.body.hasOwnProperty("remove1")){
        Order.findOne({restaurantname:customListName},function(err,founditems){
          if (founditems.productTwoquality>0){
            Order.updateOne({restaurantname:customListName},{productTwoquality:founditems.productTwoquality-1}, function (err, result) {
              if (err){
                  //console.log(err)
              }else{
                  //console.log("Result :", result)
              }
          });
          }
        });
      }

      if(req.body.hasOwnProperty("add2")){
        Order.findOne({restaurantname:customListName},function(err,founditems){
          Order.updateOne({restaurantname:customListName},{productThreequality:founditems.productThreequality+1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result)
            }
        });

        });
    }
    if(req.body.hasOwnProperty("remove2")){
          Order.findOne({restaurantname:customListName},function(err,founditems){
            if (founditems.productThreequality>0){
              Order.updateOne({restaurantname:customListName},{productThreequality:founditems.productThreequality-1}, function (err, result) {
                if (err){
                    //console.log(err)
                }else{
                    //console.log("Result :", result)
                }
            });
            }
          });
        }

        if(req.body.hasOwnProperty("add3")){
          Order.findOne({restaurantname:customListName},function(err,founditems){
            Order.updateOne({restaurantname:customListName},{productFourquality:founditems.productFourquality+1}, function (err, result) {
              if (err){
                  //console.log(err)
              }else{
                  //console.log("Result :", result)
              }
          });

          });
      }
      if(req.body.hasOwnProperty("remove3")){
            Order.findOne({restaurantname:customListName},function(err,founditems){
              if (founditems.productFourquality>0){
                Order.updateOne({restaurantname:customListName},{productFourquality:founditems.productFourquality-1}, function (err, result) {
                  if (err){
                      //console.log(err)
                  }else{
                      //console.log("Result :", result)
                  }
              });
              }
            });
          }

          if(req.body.hasOwnProperty("add4")){
            Order.findOne({restaurantname:customListName},function(err,founditems){
              Order.updateOne({restaurantname:customListName},{productFivequality:founditems.productFivequality+1}, function (err, result) {
                if (err){
                    //console.log(err)
                }else{
                    //console.log("Result :", result)
                }
            });

            });
        }
        if(req.body.hasOwnProperty("remove4")){
              Order.findOne({restaurantname:customListName},function(err,founditems){
                if (founditems.productFivequality>0){
                  Order.updateOne({restaurantname:customListName},{productFivequality:founditems.productFivequality-1}, function (err, result) {
                    if (err){
                        //console.log(err)
                    }else{
                        //console.log("Result :", result)
                    }
                });
                }
              });
            }

            if(req.body.hasOwnProperty("add5")){
              Order.findOne({restaurantname:customListName},function(err,founditems){
                Order.updateOne({restaurantname:customListName},{productSixquality:founditems.productSixquality+1}, function (err, result) {
                  if (err){
                      //console.log(err)
                  }else{
                      //console.log("Result :", result)
                  }
              });

              });
          }
          if(req.body.hasOwnProperty("remove5")){
                Order.findOne({restaurantname:customListName},function(err,founditems){
                  if (founditems.productSixquality>0){
                    Order.updateOne({restaurantname:customListName},{productSixquality:founditems.productSixquality-1}, function (err, result) {
                      if (err){
                          //console.log(err)
                      }else{
                          //console.log("Result :", result)
                      }
                  });
                  }
                });
              }
res.redirect('/resturants/'+customListName);
})

module.exports = router;
