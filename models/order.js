const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var orderSchema = new mongoose.Schema({
  restaurantname      : String,
  username            : String,
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


const Order = new mongoose.model("Order",orderSchema);
module.exports = Order;
