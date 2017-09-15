// ========> UTILITIES <=========
var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// var campgrounds = [
//       { name: 'Dark Hollow Falls', image: 'https://i.pinimg.com/600x315/73/f6/52/73f6528c2cc62cfcf05cd71575bb0224.jpg'},
//       { name: 'Billy Goat Trail', image: 'http://www.livedogrow.com/wp-content/uploads/view-of-river-from-billy-goat-trail.jpg'},
//       { name: 'Gunpowder Falls', image: 'https://i1.wp.com/recreationnews.com/wp-content/uploads/2016/02/5347709848_e6095825a8_b.jpg?resize=678%2C381'}
// ];

// ========> SCHEMA SETUP <=========

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

//      
// ========> ROUTES <=========

app.get('/', function(req,res){
  res.render('landing');
});

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

app.post('/campgrounds', function(req,res){
  // get data from form and add to campgrounds array
  var campName = req.body.formName;
  var campImage = req.body.formImage;
  var newCampground = { name: campName, image: campImage}

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

app.get('/campgrounds/new', function(req,res){
  res.render('new');
}); 

// ========> SERVER <=========
app.listen(8080, function(){
  console.log('YELPCAMP SERVER STARTED! --> http://localhost:8080');
})