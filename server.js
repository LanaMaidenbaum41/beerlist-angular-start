var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require("./beerModel");

mongoose.connect('mongodb://localhost/beerslist');

var app = express();

app.use(express.static('public'));
app.use(express.static('templates'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware error cb function
function errorCB(res, next) {
  return function (error, beer) {
    if (error) next(error);
    res.send(beer);
  }
};

//GET routes (retrieving info from database)
app.get('/beers', function (req, res, next) {
  Beer.find(errorCB(res, next));
});
//get a single beer by id
app.get('/beer/:id', function(req, res, next) {
  Beer.findById(req.params.id, errorCB(res, next));
});

//DELETE routes (deleting info from database)
app.delete('/beers/:name', function (req, res, next) {
  console.log(req.params.name);
  Beer.findOneAndRemove({ name: req.params.name }, errorCB(res, next));
});

//POST routes (adding info to database)
app.post('/beers', function (req, res, next) {
  Beer.create(req.body, errorCB(res, next));
});

app.post('/beers/:id/ratings', function (req, res, next) {
  //code a suitable update object 
  //using req.body to retrieve the new rating
  //$push operator in Mongo appends a specified value to an array
  var updateObject = { $push: { ratings: req.body.rating } };

  Beer.findByIdAndUpdate(req.params.id, updateObject, { new: true }, errorCB(res, next));
});

//PUT routes (updates to database)
app.put('/beers/:id/newname', function (req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, { new: true }, errorCB(err, beer, next));
});


app.all('*', function(req, res) {
  res.sendFile(__dirname +"/public/index.html")
})

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});
