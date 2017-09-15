// ========> UTILITIES <=========
var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// ========> SCHEMA SETUP <=========

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

//      
// ========> ROUTES <=========

app.get('/', function(req,res){
  res.render('landing');
});

// INDEX - display list 
app.get('/campgrounds', function(req,res){
  // Get campgrounds from database
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log('ERROR!');
      console.log(err);
    } else {
      res.render('campgrounds', {campgrounds: allCampgrounds});
    }
  }); 
});

// CREATE - add campground to DB list 
app.post('/campgrounds', function(req,res){
  // get data from form and add to campgrounds array
  var name = req.body.formName;
  var image = req.body.formImage;
  var descr = req.body.formDescr;
  var newCampground = { name: name, image: image, description: descr}

  // Create new campground and save to campgrounds database
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds
      res.redirect('/campgrounds');
    }
  });
});

// NEW - show form to create new campground
app.get('/campgrounds/new', function(req,res){
  res.render('new');
}); 

// SHOW - Display info about one campground
app.get('/campgrouds/:id', function(req, res){
  // find campground with id
  // render template to show that campground
  res.render('show')
})



// ========> SERVER <=========
app.listen(8080, function(){
  console.log('YELPCAMP SERVER STARTED! --> http://localhost:8080');
})