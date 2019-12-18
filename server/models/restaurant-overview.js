const mongoose = require('mongoose');
const db = require('../db/index.js');
mongoose.Promise = global.Promise;

const overviewSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  review: Number,
  reviewStars: [Number],
  numOfReviews: Number,
  pricePerPersonLow: String,
  pricePerPersonHigh: String,
  category: String,
  topTags: [String],
  description: String,
});

const Overview = mongoose.model('Overview', overviewSchema);

module.exports = Overview;