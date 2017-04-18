var express = require('express');
var router  = express.Router();
var Story  = require('../models/story.js');
var Comment  = require('../models/comments.js')


router.post('/submit', function(req, res){
  var newComment = new Comment(req.body);

  newComment.save(function(err, doc){
    if (err) {
      res.send(err)
    } else {
      console.log('comment saved')
    }

    Story.findOneAndUpdate({}, { $push: { "comments": doc._id } }, { new: true }, function(error, doc) {
      if (error) {
        res.send(error);
      }

      else {
        res.send(doc);
      }
    })
  }) 

}) // end of post request

module.exports = router;