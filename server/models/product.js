const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: String,
  condition: String,
  brand: String,
  price: { type: Number, required: true },         // starting price
  auctionEnds: { type: Date, required: true },

  // NEW for bidding:
  currentBid: { type: Number, default: null },      // highest bid so far (null = no bids yet)
  bids: [
    {
      userId: String,                               // basic for now; matches what you store in localStorage
      amount: Number,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);




