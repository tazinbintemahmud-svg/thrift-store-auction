// server/controllers/thriftItemController.js
const ThriftItem = require('../models/ThriftItem');

const getAllItems = async (req, res) => {
  try {
    const items = await ThriftItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllItems };
