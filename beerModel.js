var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    user:{type:String},
    text:{type:String}
})

var beerSchema = new mongoose.Schema({
    name: {type:String},
    style: {type:String},
    image_url: {type:String},
    abv: {type:Number},
    ratings:[Number],
    reviews:[reviewSchema]
});

var Beer = mongoose.model("Beer",beerSchema);

module.exports = Beer;