const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    customer: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        default: 0
    },

    stage: {
        type: String,
        enum: [
            "Prospecting",
            "Negotiation",
            "Closed Won",
            "Closed Lost"
        ],
        default: "Prospecting"
    },

    expectedDate: {
        type: String
    }
});

module.exports = mongoose.model("Deal", dealSchema);