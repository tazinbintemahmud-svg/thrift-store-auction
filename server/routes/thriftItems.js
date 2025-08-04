// server/routes/thriftItems.js
const express = require('express');
const router = express.Router();
const { getAllItems } = require('../controllers/thriftItemController');

router.get('/', getAllItems);

module.exports = router;

