const Transaction = require("../models/Transaction");

// @desc Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("user_id bid_id");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate("user_id bid_id");
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { user_id, bid_id, from_wallet, to_wallet, amount, status } = req.body;

    const newTransaction = new Transaction({ user_id, bid_id, from_wallet, to_wallet, amount, status });
    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    Object.assign(transaction, req.body);
    await transaction.save();

    res.json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
