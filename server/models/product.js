const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  condition: String,
  brand: String,
  price: Number,
  auctionEnds: Date
});

module.exports = mongoose.model('Product', productSchema); // ← This becomes 'products' in MongoDB



