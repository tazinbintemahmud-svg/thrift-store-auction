const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

// Get all products (with optional filters: search + category)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title:   { $regex: search, $options: 'i' } },
        { brand:   { $regex: search, $options: 'i' } },
        { category:{ $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(" Error fetching products:", err);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(" Error fetching product:", err);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// NEW: Place a bid
router.post('/:id/bid', async (req, res) => {
  try {
    const { amount, userId } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Auction must still be running
    const now = Date.now();
    if (product.auctionEnds && now > new Date(product.auctionEnds).getTime()) {
      return res.status(400).json({ message: 'Auction has ended' });
    }

    const bid = Number(amount);
    if (Number.isNaN(bid) || bid <= 0) {
      return res.status(400).json({ message: 'Invalid bid amount' });
    }

    // Current price is either currentBid (if exists) or starting price
    const current = product.currentBid != null ? product.currentBid : product.price;

    // Simple rule: must be strictly greater; you can add increments if you want
    if (bid <= current) {
      return res.status(400).json({ message: `Bid must be higher than current price (${current})` });
    }

    // Update
    product.currentBid = bid;
    product.bids.push({ userId: userId || 'guest', amount: bid });
    await product.save();

    res.json({ message: 'Bid placed', product });
  } catch (err) {
    console.error('Error placing bid:', err);
    res.status(500).json({ message: 'Error placing bid' });
  }
});

module.exports = router;
