var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require("./beerModel");

mongoose.connect('mongodb://localhost/beerslist');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get route to retrieve all the beer documents from the beerslist db
app.get('/beers',function(req,res,next){
  Beer.find(function(error,beers){
    if (error) next(error);
    res.send(beers);
  });
});

//post route to add beers to our db
app.post('/beers', function (req, res, next) {
  Beer.create(req.body,function(err,beer){
    if (err) throw err;
    res.send(beer);
  });
});

//delete route 
app.delete('/beers/:name',function(req,res,next){  
  Beer.findOneAndRemove({name:req.params.name},function(err,result){
    if (err) throw err;
    res.send(result);
  });
});

//rating a beer post route
app.post('/beers/:id/ratings', function(req, res, next) {
  //code a suitable update object 
  //using req.body to retrieve the new rating
  //$push operator in Mongo appends a specified value to an array
  var updateObject = {$push: {ratings:req.body.rating} }; 

  Beer.findByIdAndUpdate(req.params.id, updateObject, { new: true }, function(err, beer) {
      if (err) {
          return next(err);
      } else {
          res.send(beer);
      }
  });
});
//put route to update a beers name
app.put('/beers/:id/newname',function(req,res,next){
  Beer.findByIdAndUpdate(req.params.id, req.body ,{new: true},function(err,beer){
    if(err) throw err;
    res.send(beer);
  });
});
// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});


// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8000, function() {
  console.log("yo yo yo, on 8000!!")
});
