const Bid = require("../models/Bid");

// @desc Get all bids
exports.getBids = async (req, res) => {
  try {
    const bids = await Bid.find().populate("user_id transaction_id");
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a single bid by ID
exports.getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate("user_id transaction_id");
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new bid
exports.createBid = async (req, res) => {
  try {
    const { user_id, wallet_address, bid_amount, multiplier, result, transaction_id } = req.body;

    const newBid = new Bid({ user_id, wallet_address, bid_amount, multiplier, result, transaction_id });
    await newBid.save();

    res.status(201).json(newBid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update a bid
exports.updateBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    Object.assign(bid, req.body);
    await bid.save();

    res.json({ message: "Bid updated successfully", bid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a bid
exports.deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    await bid.deleteOne();
    res.json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
