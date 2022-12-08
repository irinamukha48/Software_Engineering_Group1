const Restaurant = require('../models/restaurants');
const Order = require('../models/order');
const UserOrder = require('../models/userorder');

const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const { Types } = require('mongoose');

var items = []
var ordernumber = Math.floor(Math.random()*10000)+1000;
var creditcardutils = require('creditcardutils');// Libary

exports.all_resturant = function(req,res) {

  Restaurant.find({},function(err,foundrestaurant){
    //var action = "/resturants/"+foundrestaurant
    res.render("restaurant",{newListItems:foundrestaurant})
  })

}

exports.render_resturant = function(req,res) {

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
  
}

exports.modify_order = function(req,res) {
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
}

exports.render_checkout_order = function(req,res) {
    var customResturants = req.params.customResturants
    var customcheckout   = req.params.customcheckout
    var name = req.user.name
    Restaurant.findOne({restaurantName:customResturants},function(err,found){
        Order.findOne({username:name},function(err,founditems){

            res.render("checkout",
            {prod1:founditems.productOnequantity,  prod2:founditems.productTwoquantity,
            prod3:founditems.productThreequantity,prod4:founditems.productFourquantity,
            prod5:founditems.productFivequantity, prod6:founditems.productSixquantity,
            action:"/resturants/"+customResturants+"/checkout",
            checkout:"/resturants/"+customResturants+"/checkout",
            productOne:found.productOneimageurl,
            productTwo:found.productTwoimageurl,
            productThree:found.productThreeimageurl,
            productFour:found.productFourimageurl,
            productFive:found.productFiveimageurl,
            productSix:found.productSiximageurl,
            total:founditems.bill})
        })
    })
}

exports.link_order_and_user = function(req,res) {
    var customResturants = req.params.customResturants
    var customcheckout   = req.params.customcheckout
    var name = req.user.name
    var ordernumber = Math.floor(Math.random()*10000)+1000;

    Order.findOne({username:name},function(err,found){
        var FirstName       =  req.body.firstname;
        var LastName        =  req.body.lastname;
        var Email           =  req.body.emailaddress;
        var address         =  req.body.address;
        var NameOnCard      =  req.body.NameOnCard;
        var CardNumber      =  req.body.cardNumber;
        var month           =  req.body.month;
        var year            =  req.body.year;
        var cvv             =  req.body.cvv;
        var restaurentName  = found.restaurantname;
        var price = found.bill;


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
        //req.flash('error',error.msg)
        //console.log(error.msg)
        })


    }

        if (creditcardutils.validateCardNumber(CardNumber)=== false){
        console.log("Invalid Credit Card Number");
        res.redirect("checkout");
        }
        else if (creditcardutils.validateCardCVC(cvv) === false){
        console.log("Invalid CVV Number");
        res.redirect("checkout");
        }
        else if (creditcardutils.validateCardExpiry(month,year)=== false){
        console.log("Invalid Expiration Date");
        res.redirect("checkout");
        }else{

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.PASS
            }
        });
        let mailDetails = {
            from: process.env.USER_NAME,
            to: Email,
            subject: 'ECE GRUBHUB',
            text: 'Hi,'+" "+name+" "+'Thank you for choosing'+" "+found.restaurantname+" "+"resturant. We are currently preparing your food and the estimated time to up is xyz.Your"+" "+"Order Number is"+" "+"ECE"+ordernumber+"."+" "+"Thank You for choosing ECE GRUBHUB."
        };
        var CreateOrder = UserOrder({
            restaurantname      : restaurentName,
            email               : Email,
            ordernumber         : "ECE"+ordernumber,
            username            : FirstName+" "+LastName,
            deliveryaddress     : address,
            productOnename      : found.productOnename,
            productOnequantity  : found.productOnequantity,
            productTwoname      : found.productTwoname,
            productTwoquantity  : found.productTwoquantity,
            productThreename    : found.productThreename,
            productThreequantity: found.productThreequantity,
            productFourname     : found.productFourname,
            productFourquantity : found.productFourquantity,
            productFivename     : found.productFivename,
            productFivequantity : found.productFivequantity,
            productSixname      : found.productSixname,
            productSixquantity  : found.productSixquantity,
            bill                : found.bill
        })
        CreateOrder.save()
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        })
        res.redirect("/resturants/"+customResturants+"/checkout/success")

        }
        //res.redirect("/resturants/"+customResturants+"/checkout/success")
    })
}

exports.render_success = function (req,res) {
    var customResturants = req.params.customResturants
    var name =  req.user.name

    UserOrder.findOne({username:name},function(err,result){
      console.log(result)
        res.render("success",{Subject:"Hi,"+" "+name+" "+"your Order Number is:"+" "+result.ordernumber,
        message:"As Always Thank you for choosing ECE GRUBHUB" })
    })
}