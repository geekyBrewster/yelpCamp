var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var pool = require('./modules/pool.js');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, './public/views/'));
app.set('view engine', 'ejs');

// INDEX ROUTE
app.get('/campgrounds', function(req, res){
  console.log("Retrieving campgrounds");
  //Get campgrounds from the DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('SELECT * FROM campsites;',
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making INSERT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          console.log('Retrieved campground data from DB: ', result.rows);
          res.render("index.ejs", {campgrounds: result.rows}); //second variable is data object passed to client side
        }
      });
    } // end of else
  }); //end of pool.connect
}); //end of GET request

// CREATE ROUTE
app.post('/campgrounds', function(req, res){
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  //add to campgrounds DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query("insert into campsites(name, image, description) values($1, $2, $3);", [name, image, desc],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making INSERT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          console.log('Campsite added');
          //redirect back to campgrounds page
          res.redirect('/campgrounds');
        }
      });
    } // end of else
  }); //end of pool.connect
}); //end of POST route

// NEW ROUTE
app.get('/campgrounds/new', function(req, res){
  res.render('newCampground.ejs');
});

// SHOW ROUTE
app.get('/campgrounds/:id', function(req, res){
  var campground = [];
  var comments = [];
  //Find campground with matching id
  var campsiteID = req.params.id;
  //find campsite in DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY for Campsite
      db.query('select "campsites"."id", "campsites"."name", "campsites"."image",'+
      '"campsites"."description" from "campsites" where "campsites"."id" = $1;', [req.params.id],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making INSERT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          campground = result.rows;
          console.log('Campsite selected: ', campground);

          // Make DB query for campsite's comments
          db.query('select "campsites"."id" as "campsite_id", "comments"."author", "comments"."comment" from "campsites" join "comments" ' +
          'on "campsites"."id" = "comments"."campsite_id" where "campsites"."id" = $1;', [req.params.id],
          function(errMakingQuery, result){
            done();
            if(errMakingQuery){
              console.log('There was an error making INSERT query: ', errMakingQuery);
              res.sendStatus(500);
            } else {
              comments = result.rows;
              console.log('Campsite\'s comments selected: ', comments);

              //Render template to display that campgrond's info
              res.render("show.ejs", {campsite: campground, comments: comments});
            }
          });
        }
      });
    } // end of else
  }); //end of pool.connect
}); //end of GET single campsite

// --- COMMENT ROUTES --- //

// NEW route for comments
app.get('/campgrounds/:id/comments/new', function(req,res){
  // Find campground by id
    pool.connect(function(errConnectingToDatabase, db, done){
      if(errConnectingToDatabase) {
        console.log('There was an error connecting to database: ', errConnectingToDatabase);
        res.sendStatus(500);
      } else {
        // MAKE DB QUERY for Campsite
        db.query('select "campsites"."id", "campsites"."name", "campsites"."image",'+
        '"campsites"."description" from "campsites" where "campsites"."id" = $1;', [req.params.id],
        function(errMakingQuery, result){
          done();
          if(errMakingQuery){
            console.log('There was an error making SELECT query: ', errMakingQuery);
            res.sendStatus(500);
          } else {
            console.log('Campsite selected: ', result.rows);

            // Render new comment form
            res.render('newComment.ejs', {campground: result.rows});
          }
        });
      } // end of else
    }); //end of pool.connect
  }); //end of GET single campsite

//CREATE route for comments
app.post('/campgrounds/:id/comments', function(req, res){
  //Look up campsite by ID
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY for Campsite
      db.query('select * from "campsites" where "campsites"."id" = $1;', [req.params.id],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making SELECT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          console.log('Campsite found.');

          //Add Comment to Comments Table in DB
          //get data from form
          var comment = req.body.comment;
          var author = req.body.author;

          //add to comments in DB
          pool.connect(function(errConnectingToDatabase, db, done){
            if(errConnectingToDatabase) {
              console.log('There was an error connecting to database: ', errConnectingToDatabase);
              res.sendStatus(500);
            } else {
              // MAKE DB QUERY
              db.query("insert into comments(campsite_id, author, comment) values($1, $2, $3);", [req.params.id, author, comment],
              function(errMakingQuery, result){
                done();
                if(errMakingQuery){
                  console.log('There was an error making INSERT query: ', errMakingQuery);
                  res.sendStatus(500);
                } else {
                  console.log('Campsite added');
                  //redirect back to campgrounds page
                  res.redirect('/campgrounds');
                }
              });
            } // end of else
          }); //end of pool.connect for Comment Query
        }
      });
    } // end of else
  }); //end of pool.connect for Campsite Query
}); //end of CREATE route



// Catch all route //
app.get('/', function(req, res) {
  console.log('request for landing page');
  res.render("landing");
});

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
