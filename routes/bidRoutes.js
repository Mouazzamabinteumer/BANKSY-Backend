const express = require("express");
const { getBids, getBidById, createBid, updateBid, deleteBid } = require("../controllers/bidController");

const router = express.Router();

router.get("/", getBids);
router.get("/:id", getBidById);
router.post("/", createBid);
router.put("/:id", updateBid);
router.delete("/:id", deleteBid);

module.exports = router;
