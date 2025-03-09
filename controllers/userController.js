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

// @desc Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new user
exports.createUser = async (req, res) => {
  try {
    const { wallet_address, ip_address } = req.body;

    // Check if wallet_address already exists
    const existingUser = await User.findOne({ wallet_address });
    if (existingUser) {
      return res.status(400).json({ message: "User with this wallet already exists" });
    }

    const newUser = new User({ wallet_address, ip_address });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { wallet_address, is_always_win, ip_address } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields only if provided in request
    if (wallet_address) user.wallet_address = wallet_address;
    if (typeof is_always_win === "boolean") user.is_always_win = is_always_win;
    if (ip_address) user.ip_address = ip_address;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
