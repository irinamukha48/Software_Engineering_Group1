const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var reviewSchema = new mongoose.Schema({
    username       : String,
    restaurantname : String,
    message        : String
});

const Review = new mongoose.model("Review",reviewSchema,"reviews");
module.exports = Review;