const mongoose = require("mongoose");

// Define the schema for the User collection
const userSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      required: true,
      unique: true,
    },
    is_always_win: {
      type: Boolean,
      default: false,
    },
    ip_address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;

