const express = require('express');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

const Restaurant = require('../models/restaurants');
const Order = require('../models/order');



router.get("/:customListName",function(req,res){
  const customListName = req.params.customListName
  var bill;
  var name = req.user.name
  Restaurant.findOne({restaurantName:customListName},function(err,foundrestaurant){
  Order.findOne({username:name},function(err,found){
    if(found === null){
      UserInCart = Order({
      restaurantname      : foundrestaurant.restaurantName,
      username            : req.user.name,
      productOnename      : foundrestaurant.productOneName,
      productOnequantity  : 0,
      productTwoname      : foundrestaurant.productTwoName,
      productTwoquantity  : 0,
      productThreename    : foundrestaurant.productThreeName,
      productThreequantity: 0,
      productFourname     : foundrestaurant.productFourName,
      productFourquantity : 0,
      productFivename     : foundrestaurant.productFiveName,
      productFivequantity : 0,
      productSixname      : foundrestaurant.productSixName,
      productSixquantity  : 0,
      bill                : 0
    })
    UserInCart.save();
    Restaurant.findOne({restaurantName:customListName},function(err,foundrestaurant){
      res.render("restFour",{restaurantname:foundrestaurant.restaurantName,
          productOne:foundrestaurant.productOneName,
          productOneQuantity: 0,
          productOneImage:foundrestaurant.productOneimageurl,

          productTwo:foundrestaurant.productTwoName,
          productTwoQuantity:0,
          productTwoImage:foundrestaurant.productTwoimageurl,

          productThree:foundrestaurant.productThreeName,
          productThreeQuantity:0,
          productThreeImage: foundrestaurant.productThreeimageurl,

          productFour:foundrestaurant.productFourName,
          productFourQuantity:0,
          productFourImage:foundrestaurant.productFourimageurl,

          productFive:foundrestaurant.productFiveName,
          productFiveQuantity:0,
          productFiveImage:foundrestaurant.productFiveimageurl,

          productSix:foundrestaurant.productSixName,
          productSixQuantity:0,
          productSixImage:foundrestaurant.productSiximageurl,

          productOnePrice  : foundrestaurant.productOnePrice,
          productTwoPrice  : foundrestaurant.productTwoPrice,
          productThreePrice: foundrestaurant.productThreePrice,
          productFourPrice : foundrestaurant.productFourPrice,
          productFivePrice : foundrestaurant.productFivePrice,
          productSixPrice  : foundrestaurant.productSixPrice,
          total:0,

          actionVal:'/resturants/'+customListName,
          checkout:'/resturants/'+customListName+'/checkout'
        })
    })
  }else{
    Restaurant.findOne({restaurantName:customListName},function(err,foundrestaurant){
      Order.findOne({username:name},function(err,found){
        bill = (foundrestaurant.productOnePrice *found.productOnequantity)
      +(foundrestaurant.productTwoPrice * found.productTwoquantity )+
       (foundrestaurant.productThreePrice * found.productThreequantity)
      + (foundrestaurant.productFourPrice * found.productFourquantity)+
        (foundrestaurant.productFivePrice * found.productFivequantity)
      + (foundrestaurant.productSixPrice * found.productSixquantity);
      bill = (Math.round(bill * 100) / 100)

      Order.updateOne({username:name},{bill:bill},function(err,res){
      })
       
        res.render("restFour",{restaurantname:foundrestaurant.restaurantName,
      productOne:foundrestaurant.productOneName,
      productOneQuantity: found.productOnequantity,
      productOneImage:foundrestaurant.productOneimageurl,

      productTwo:foundrestaurant.productTwoName,
      productTwoQuantity:found.productTwoquantity,
      productTwoImage:foundrestaurant.productTwoimageurl,

      productThree:foundrestaurant.productThreeName,
      productThreeQuantity:found.productThreequantity,
      productThreeImage: foundrestaurant.productThreeimageurl,

      productFour:foundrestaurant.productFourName,
      productFourQuantity:found.productFourquantity,
      productFourImage:foundrestaurant.productFourimageurl,

      productFive:foundrestaurant.productFiveName,
      productFiveQuantity:found.productFivequantity,
      productFiveImage:foundrestaurant.productFiveimageurl,

      productSix:foundrestaurant.productSixName,
      productSixQuantity:found.productSixquantity,
      productSixImage:foundrestaurant.productSiximageurl,

      productOnePrice  : foundrestaurant.productOnePrice,
      productTwoPrice  : foundrestaurant.productTwoPrice,
      productThreePrice: foundrestaurant.productThreePrice,
      productFourPrice : foundrestaurant.productFourPrice,
      productFivePrice : foundrestaurant.productFivePrice,
      productSixPrice  : foundrestaurant.productSixPrice,
      total:found.bill,

      actionVal:'/resturants/'+customListName,
      checkout:'/resturants/'+customListName+'/checkout'
    })
      })
    })
  }
  })
 })

})

router.post('/:customListName',function(req,res){
  var name = req.user.name
  const customListName = req.params.customListName

      // Updating Product One
  if(req.body.hasOwnProperty("add")){
  Order.findOne({username:name},function(err,founditems){
    Order.updateOne({username:name},{productOnequantity:founditems.productOnequantity+1}, function (err, result) {
      if (err){
          //console.log(err)
      }else{
          //console.log("Result :", result)
      }
  });

  });
}
  if(req.body.hasOwnProperty("remove")){
    Order.findOne({username:name},function(err,founditems){
      if (founditems.productOnequantity>0){
        Order.updateOne({username:name},{productOnequantity:founditems.productOnequantity-1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result)
          }
      });
      }
    });
  }

     // Updating Product Two
  if(req.body.hasOwnProperty("add1")){
    Order.findOne({username:name},function(err,founditems){
      Order.updateOne({username:name},{productTwoquantity:founditems.productTwoquantity+1}, function (err, result) {
        if (err){
            //console.log(err)
        }else{
            //console.log("Result :", result)
        }
    });

    });
  }
  if(req.body.hasOwnProperty("remove1")){
      Order.findOne({username:name},function(err,founditems){
        if (founditems.productTwoquantity>0){
          Order.updateOne({username:name},{productTwoquantity:founditems.productTwoquantity-1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result)
            }
        });
        }
      });
    }

    // Updating Product Three
  if(req.body.hasOwnProperty("add2")){
      Order.findOne({username:name},function(err,founditems){
        Order.updateOne({username:name},{productThreequantity:founditems.productThreequantity+1}, function (err, result) {
          if (err){
              //console.log(err)
          }else{
              //console.log("Result :", result)
          }
      });

      });
    }
  if(req.body.hasOwnProperty("remove2")){
        Order.findOne({username:name},function(err,founditems){
          if (founditems.productThreequantity>0){
            Order.updateOne({username:name},{productThreequantity:founditems.productThreequantity-1}, function (err, result) {
              if (err){
                  //console.log(err)
              }else{
                  //console.log("Result :", result)
              }
          });
          }
        });
      }

      // Updating Product Four
  if(req.body.hasOwnProperty("add3")){
        Order.findOne({username:name},function(err,founditems){
          Order.updateOne({username:name},{productFourquantity:founditems.productFourquantity+1}, function (err, result) {
            if (err){
                //console.log(err)
            }else{
                //console.log("Result :", result)
            }
        });

        });
      }
  if(req.body.hasOwnProperty("remove3")){
          Order.findOne({username:name},function(err,founditems){
            if (founditems.productFourquantity>0){
              Order.updateOne({username:name},{productFourquantity:founditems.productFourquantity-1}, function (err, result) {
                if (err){
                    //console.log(err)
                }else{
                    //console.log("Result :", result)
                }
            });
            }
          });
        }

        // Updating Product Five
  if(req.body.hasOwnProperty("add4")){
          Order.findOne({username:name},function(err,founditems){
            Order.updateOne({username:name},{productFivequantity:founditems.productFivequantity+1}, function (err, result) {
              if (err){
                  //console.log(err)
              }else{
                  //console.log("Result :", result)
              }
          });

          });
        }
  if(req.body.hasOwnProperty("remove4")){
            Order.findOne({username:name},function(err,founditems){
              if (founditems.productFivequantity>0){
                Order.updateOne({username:name},{productFivequantity:founditems.productFivequantity-1}, function (err, result) {
                  if (err){
                      //console.log(err)
                  }else{
                      //console.log("Result :", result)
                  }
              });
              }
            });
          }

          // Updating Product Six
  if(req.body.hasOwnProperty("add5")){
            Order.findOne({username:name},function(err,founditems){
              Order.updateOne({username:name},{productSixquantity:founditems.productSixquantity+1}, function (err, result) {
                if (err){
                    //console.log(err)
                }else{
                    //console.log("Result :", result)
                }
            });

            });
          }
  if(req.body.hasOwnProperty("remove5")){
              Order.findOne({username:name},function(err,founditems){
                if (founditems.productSixquantity>0){
                  Order.updateOne({username:name},{productSixquantity:founditems.productSixquantity-1}, function (err, result) {
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
