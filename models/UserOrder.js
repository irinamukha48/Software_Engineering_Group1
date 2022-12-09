const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var userorderSchema = new mongoose.Schema({
  restaurantname      : String,
  email               : String,
  orderemail          : String,
  ordernumber         : String,
  username            : String,
  deliveryaddress     : String,
  productOnename      : String,
  productOnequantity  : Number,
  productTwoname      : String,
  productTwoquantity  : Number,
  productThreename    : String,
  productThreequantity: Number,
  productFourname     : String,
  productFourquantity : Number,
  productFivename     : String,
  productFivequantity : Number,
  productSixname      : String,
  productSixquantity  : Number,
  bill                : Number

});


const UserOrder = new mongoose.model("UserOrder",userorderSchema,"invoices");
module.exports = UserOrder;
