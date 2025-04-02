const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const User = require("../models/user");

router.post("/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(409).json({ err: "Username already taken" });
    }
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
    });

    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    res.status(200).json({ message: "Signing in!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
