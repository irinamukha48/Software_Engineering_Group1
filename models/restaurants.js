const mongoose = require('mongoose')

const Schema = mongoose.Schema;
var restaurantsSchema = new mongoose.Schema({
  restaurantName:     String,
  restaurantaddress:  String,
  productOneName:     String,
  productOnePrice:    Number,
  productOneimageurl: String,
  productTwoName:     String,
  productTwoPrice:    Number,
  productTwoimageurl: String,
  productThreeName:     String,
  productThreePrice:    Number,
  productThreeimageurl: String,
  productFourName:     String,
  productFourPrice:    Number,
  productFourimageurl: String,
  productFiveName:     String,
  productFivePrice:    Number,
  productFiveimageurl: String,
  productSixName:     String,
  productSixPrice:    Number,
  productSiximageurl: String

});


const Restaurants = new mongoose.model("Restaurants",restaurantsSchema,"restaurants");
module.exports = Restaurants;
