const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Converted"],
        default: "New"
    },
    dealValue: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Lead", leadSchema);