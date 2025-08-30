const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }   // ✅ adds createdAt & updatedAt automatically
);

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);


