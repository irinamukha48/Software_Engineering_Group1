const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var userorderSchema = new mongoose.Schema({
  email          : String,
  name           : String,
  restaurentName : String,
  address        : String,
  classicFires   : Number,
  JuicyBurger    : Number,
  ChessyPizza    : Number,
  FriedChicken   : Number,
  LeafySalad     : Number,
  SoftDrinks     : Number,
  price          : Number
});


const UserOrder = new mongoose.model("UserOrder",userorderSchema);
module.exports = UserOrder;