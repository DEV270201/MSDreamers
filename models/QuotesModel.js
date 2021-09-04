const mongoose = require('mongoose');

const QuotesSchema = new mongoose.Schema({
  Quote : String,
  Author : String,
  Date: String
});

const Quotes = mongoose.model("Quote",QuotesSchema);

module.exports = Quotes;