// server/models/ThriftItem.js
const mongoose = require('mongoose');

const thriftItemSchema = new mongoose.Schema({
  title: String,
  image: String, // image URL
  basePrice: Number,
  auctionStatus: String, // example: 'Ongoing', 'Ended'
});

module.exports = mongoose.model('ThriftItem', thriftItemSchema);

