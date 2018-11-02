// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for articles.
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  url: {
    type: String,
    required: true
  }
});

// Create the Model
var Article = mongoose.model("Article", ArticleSchema);

// Export it for use elsewhere
module.exports = Article;