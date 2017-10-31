var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var pool = require('./modules/pool.js');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public/views'));

app.get('/campgrounds', function(req, res){
  console.log("Retrieving campgrounds");
  //Get campgrounds from the DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('SELECT name, image FROM campsites;',
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making INSERT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          //console.log('Retrieved client data from DB: ', result);
          res.render("campgrounds", {campgrounds: result.rows}); //second variable is data object passed to client side
        }
      });
    } // end of else
  }); //end of pool.connect
}); //end of get request


app.post('/campgrounds', function(req, res){
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  //add to campgrounds array
  campgrounds.push(newCampground);
  //redirect back to campgrounds page
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
  res.render('new.ejs');
});

app.get('/', function(req, res) {
  console.log('request for landing page');
  res.render("landing");
});

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
