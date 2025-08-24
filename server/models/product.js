const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: String,
  condition: String,
  brand: String,
  price: { type: Number, required: true },         
  auctionEnds: { type: Date, required: true },

  // NEW for bidding:
  currentBid: { type: Number, default: null },      
  bids: [
    {
      userId: String,                               
      amount: Number,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);




