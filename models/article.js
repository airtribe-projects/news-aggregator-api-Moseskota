const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  articleId: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  title: String,
  description: String,
  source: String,
  publishedAt: String
});

module.exports = mongoose.model('Article', ArticleSchema);
