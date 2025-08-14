
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 
const app = express();


app.use(cors());
app.use(express.json()); 



const productRoutes = require('./routes/product_route'); 
app.use('/api/products', productRoutes);



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
