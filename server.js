// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Snatches HTML from URLs
var request = require('request');
// Scrapes HTML
var cheerio = require('cheerio');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Requires userModel model
var Example = require("./userModel.js");

// Initialize Express
var app = express();


// Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));


// Database configuration with mongoose
//mongodb://heroku_p914858m:m3nc3lj1dqhp01dr87ob8fim27@ds031895.mlab.com:31895/heroku_p914858m
mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Make a request call to grab the HTML body from the site of your choice
request('http://www.huffingtonpost.com/', function (error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data scraped data
  var result = [];

  // Select each instance of the HTML body that you want to scrape
  $('h2.card__headline').each(function(i, element){

    var link = $(element).children().attr("href");
    var title = $(element).children().text();

    // Save these results in an object that we'll push into the result array we defined earlier
    result.push({
      title: title,
      link: link
    });
    });
  console.log(result);
});


// Routes
// ======

app.post("/submit", function(req, res) {

  var user = new Example(req.body);


/* OUR CUSTOM METHODS
 * (methods created in the userModel.js)
 * -/-/-/-/-/-/-/-/-/ */


 // TODO: Use our custom methods to create
 // the FullName and LastUpdatedDate entries
 // in the doc that the user submits. These
 // will get saved to the mongoDB collection.
 //
 // TIP: You must create these methods in the model.
user.getFullName();
user.LastUpdatedDate();

// END OF CUSTOM METHODS
// =====================
// NORMAL METHOD BELOW

  // Save a user to our mongoDB
  user.save(function(error, doc) {
    // Send an error to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to our browser
    else {
      res.send(doc);
    }
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
