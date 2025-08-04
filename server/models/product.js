// server/models/ThriftItem.js
const mongoose = require('mongoose');

const thriftItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String, // image URL
  condition: String,
  brand: String,
  auctionEnds: Date,
});

module.exports = mongoose.model('ThriftItem', thriftItemSchema);


