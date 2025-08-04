// server/seed.js
const mongoose = require('mongoose');
const ThriftItem = require('./models/ThriftItem');

// Replace with your actual MongoDB connection string
mongoose.connect('mongodb+srv://tazinbintemahmud:bb2025@cluster0.7rz1njt.mongodb.net/vintagevault?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  
  return ThriftItem.insertMany([
    {
      title: 'Vintage Camera',
      image: 'https://via.placeholder.com/150',
      basePrice: 200,
      auctionStatus: 'Ongoing',
    },
    {
      title: 'Old Vinyl Record',
      image: 'https://via.placeholder.com/150',
      basePrice: 50,
      auctionStatus: 'Ended',
    },
  ]);
})
.then(() => {
  console.log('Data inserted');
  mongoose.disconnect();
})
.catch((err) => {
  console.error('Error:', err);
});
