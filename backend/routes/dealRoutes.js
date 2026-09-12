const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

// Add Deal
router.post("/", authMiddleware, adminOnly, async (req, res) => {
    try {
        const deal = new Deal(req.body);
        const savedDeal = await deal.save();

        res.status(201).json(savedDeal);
    } catch (error) {
        res.status(500).json({
            message: "Failed to add deal",
            error: error.message
        });
    }
});

// Get All Deals
router.get("/", async (req, res) => {
    try {
        const deals = await Deal.find();

        res.json(deals);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get deals",
            error: error.message
        });
    }
});

// Update Deal
router.put("/:id", async (req, res) => {
    try {
        const updatedDeal = await Deal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedDeal);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update deal",
            error: error.message
        });
    }
});

// Delete Deal
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
    try {
        await Deal.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deal deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete deal",
            error: error.message
        });
    }
});

module.exports = router;