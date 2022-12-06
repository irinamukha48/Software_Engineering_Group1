const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var orderSchema = new mongoose.Schema({
  restaurantname    : String,
  productOnename    : String,
  productOnequality : Number,
  productTwoname    : String,
  productTwoquality : Number,
  productThreename    : String,
  productThreequality : Number,
  productFourname    : String,
  productFourquality : Number,
  productFivename    : String,
  productFivequality : Number,
  productSixname    : String,
  productSixquality : Number,

});


const Order = new mongoose.model("Order",orderSchema);
module.exports = Order;
