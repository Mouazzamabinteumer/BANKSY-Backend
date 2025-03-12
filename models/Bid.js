const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    wallet_address: { type: String, required: true },
    bid_amount: { type: Number, required: true },
    multiplier: { type: Number, required: true },
    result: { type: String, enum: ["win", "lose", "pending"], default: "pending" },
    transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  },
  { timestamps: true } // Automatically adds `createdAt` field
);

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;
