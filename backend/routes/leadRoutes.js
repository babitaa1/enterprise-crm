const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// Add Lead
router.post("/", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        const savedLead = await lead.save();

        res.status(201).json(savedLead);
    } catch (error) {
        res.status(500).json({
            message: "Failed to add lead",
            error: error.message
        });
    }
});

// Get All Leads
router.get("/", async (req, res) => {
    try {
        const leads = await Lead.find();

        res.json(leads);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get leads",
            error: error.message
        });
    }
});

// Update Lead
router.put("/:id", async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update lead",
            error: error.message
        });
    }
});

// Delete Lead
router.delete("/:id", async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);

        res.json({
            message: "Lead deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete lead",
            error: error.message
        });
    }
});

module.exports = router;