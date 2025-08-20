const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user_model");


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    res.json({ msg: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/logout", (req, res) => {
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;
