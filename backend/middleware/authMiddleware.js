const User = require("../models/User");

// Check if user is logged in
const authMiddleware = async (req, res, next) => {
    try {
        const userId = req.headers["user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({
            message: "Authentication failed",
            error: error.message
        });
    }
};

// Check if user is Admin
const adminOnly = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }

    next();
};

module.exports = {
    authMiddleware,
    adminOnly
};