const User = require("../models/User");

// @desc Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new user
exports.createUser = async (req, res) => {
  try {
    const { wallet_address, ip_address } = req.body;

    const newUser = new User({ wallet_address, ip_address });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
