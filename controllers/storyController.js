var express = require('express');
var router  = express.Router();
var Story  = require('../models/story.js');
var Comment  = require('../models/comments.js');
// Snatches HTML from URLs
var request = require('request');
// Scrapes HTML
var cheerio = require('cheerio');

router.get("/list", function(req, res) {
  Story.find({}, function(error, doc) {
    // Send an error message to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});


router.get('/', function(req, res) {
  // Makes a request call to grab the HTML body from Huffington Post
  request('http://www.huffingtonpost.com/', function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    var $ = cheerio.load(html);

    // Select each instance of the HTML body that you want to scrape
    $('h2.card__headline').each(function(i, element){

      var link = $(element).children().attr("href");
      var title = $(element).children().text();

      // Save these results in an object 
      var newStory = new Story({
        title: title,
        url: link
      });

      // looks for an existing news story with newStory's title
      Story.find({title: title}).exec(function(error, found) {
        // If news story already exists...
        if (found.length) {
          console.log("This news story already exists in the database")
        }
        // Otherwise, save the news story
        else {
          newStory.save(function(err, doc){
            if (err) {
              res.send(err)
            } else {
              console.log('story saved')
            }
          }) // end of save function
        } // end of if/else
      }) // end of story.find
    }) // end of .each function
  }) // end of request
  // Get all of the stories in the database
  var loadStories = function() {
    Story.find().populate("comments").exec(function(err, doc) {
      if (err) {
        res.send(err)
      } else {
        res.render('index', {result: doc});
      }
    })
  }
  setTimeout(loadStories(), 2500); 
}) // end of get request 



module.exports = router;
