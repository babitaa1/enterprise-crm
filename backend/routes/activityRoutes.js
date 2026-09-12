const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// Add Activity
router.post("/", async (req, res) => {
    try {
        const activity = new Activity(req.body);
        const savedActivity = await activity.save();

        res.status(201).json(savedActivity);

    } catch (error) {
        res.status(500).json({
            message: "Failed to add activity",
            error: error.message
        });
    }
});


// Get All Activities
router.get("/", async (req, res) => {
    try {
        const activities = await Activity.find().sort({ _id: -1 });

        res.json(activities);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get activities",
            error: error.message
        });
    }
});


// Delete Activity
router.delete("/:id", async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);

        res.json({
            message: "Activity deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete activity",
            error: error.message
        });
    }
});


module.exports = router;