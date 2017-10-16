var mongoose = require('mongoose');

var beerSchema = new mongoose.Schema({
    name: {type:String},
    style: {type:String},
    image_url: {type:String},
    abv: {type:Number},
    ratings:[Number]
});

var Beer = mongoose.model("Beer",beerSchema);

// var beer1 = new Beer({
//     name: 'kastel',
//     style: 'cherry',
//     image_url: 'kastel',
//     abv: 8,
//     ratings: [7]
// })

// beer1.save();

module.exports = Beer;