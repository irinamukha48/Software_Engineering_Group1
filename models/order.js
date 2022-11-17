const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var orderSchema = new mongoose.Schema({
  classicFires : Number,
  JuicyBurger  : Number,
  ChessyPizza  : Number,
  FriedChicken : Number,
  LeafySalad   : Number,
  SoftDrinks   : Number
});


const Order = new mongoose.model("Order",orderSchema);
module.exports = Order;
