var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public/views'));

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
  {name: "Redwood Falls", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
  {name: "Chase River Woods", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
  {name: "Rice Lake", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
  {name: "Granite Hills", image: "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
];

app.get('/campgrounds', function(req, res){
  console.log("Retrieving campgrounds");
  res.render("campgrounds", {campgrounds: campgrounds}); //second variable is data object passed to client side
});

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
