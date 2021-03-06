// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override')
var logger = require("morgan");
var mongoose = require("mongoose");
// Snatches HTML from URLs
var request = require('request');
// Scrapes HTML
var cheerio = require('cheerio');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Controllers
var storyController = require('./controllers/storyController');
var commentController = require('./controllers/commentController');

// Initialize Express
var app = express();


// Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// override with POST having ?_method=DELETE 
app.use(methodOverride('_method'))

// Make public a static dir
app.use(express.static("public"));


// Database configuration with mongoose
mongoose.connect("mongodb://heroku_p914858m:m3nc3lj1dqhp01dr87ob8fim27@ds031895.mlab.com:31895/heroku_p914858m");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use('/', storyController);
app.use('/comment', commentController);

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
