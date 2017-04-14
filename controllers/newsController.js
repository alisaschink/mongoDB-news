// var models  = require('./models');
var express = require('express');
var router  = express.Router();
// Snatches HTML from URLs
var request = require('request');
// Scrapes HTML
var cheerio = require('cheerio');


router.get('/', function(req, res) {
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
  res.render('index', {result: result});
});
});

module.exports = router;

  // Save a user to our mongoDB
//   user.save(function(error, doc) {
//     // Send an error to the browser
//     if (error) {
//       res.send(error);
//     }
//     // Or send the doc to our browser
//     else {
//       res.send(doc);
//     }
//   });
// });

// models.Person.findAll({
//     include: [ models.Task ]
//   }).then(function(people) {
//     res.render('people/index', {
//       user_id: req.session.user_id,
//       email: req.session.user_email,
//       logged_in: req.session.logged_in,
//       people: people
//     });
//   });