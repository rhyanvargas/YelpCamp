// UTILITIES
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

// ROUTES
app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  var campgrounds = [
      { name: 'Dark Hollow Falls', image: 'https://i.pinimg.com/600x315/73/f6/52/73f6528c2cc62cfcf05cd71575bb0224.jpg'},
      { name: 'Billy Goat Trail', image: 'http://www.livedogrow.com/wp-content/uploads/view-of-river-from-billy-goat-trail.jpg'},
      { name: 'Gunpowder Falls', image: 'https://i1.wp.com/recreationnews.com/wp-content/uploads/2016/02/5347709848_e6095825a8_b.jpg?resize=678%2C381'}
  ]
res.render('campgrounds', {campgrounds: campgrounds});
});

// SERVER
app.listen(8080, function(){
  console.log('YELPCAMP SERVER STARTED! --> http://localhost:8080');
})