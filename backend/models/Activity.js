const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },

    activityType: {
        type: String,
        enum: ["Call", "Email", "Meeting", "Follow-up"],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Activity", activitySchema);