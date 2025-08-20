
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env variables
dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
const productRoutes = require('./routes/product_route');
const authRoutes = require('./routes/auth_routes');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// ===== Database Connection =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(" MongoDB connected");
  app.listen(5000, () => 
    console.log(" Server running on http://localhost:5000")
  );
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1); // Stop app if DB fails
});
