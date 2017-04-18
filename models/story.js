// Require mongoose
var mongoose = require("mongoose");

// // Create the Schema class
var Schema = mongoose.Schema;

// new Schema: NewsSchema
var StorySchema = new Schema({
  // title: a trimmed, required string
  title: {
    type: String,
    trim: true,
  },
  // url: a trimmed, required string
  url: {
    type: String,
    trim: true,
  },
  // dateCreated: the current date
  dateCreated: {
    type: Date,
    default: Date.now
  },
  // lastUpdated: a date type entry
  lastUpdated: { type: Date },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});


// Use the above schema to make the Story model
var Story = mongoose.model("Story", StorySchema);

// Export the model so the server can use it
module.exports = Story;