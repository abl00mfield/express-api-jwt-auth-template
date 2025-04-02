const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const User = require("../models/user");

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "username");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//GET /users/:userId SHOW get a single user's details
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.useId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
