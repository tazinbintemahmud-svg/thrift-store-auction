
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// Routes

const productRoutes = require('./routes/product_route'); // adjust path
app.use('/api/products', productRoutes);


// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log(" Server running on http://localhost:5000"));
})
.catch(err => {
  console.error(" MongoDB connection error:", err);
});
