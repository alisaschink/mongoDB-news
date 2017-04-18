// Require mongoose
var mongoose = require("mongoose");

// // Create the Schema class
var Schema = mongoose.Schema;

// new Schema: NewsSchema
var CommentSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  // dateCreated: the current date
  dateCreated: {
    type: Date,
    default: Date.now
  },
  // lastUpdated: a date type entry
  lastUpdated: { type: Date }
});


// Use the above schema to make the Comment model
var Comment = mongoose.model("Comment", CommentSchema);

// Export the model so the server can use it
module.exports = Comment;