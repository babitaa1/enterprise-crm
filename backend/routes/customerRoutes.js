const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

// Add Customer
router.post("/", async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();

        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({
            message: "Failed to add customer",
            error: error.message
        });
    }
});

// Get All Customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get customers",
            error: error.message
        });
    }
});

// Delete Customer
router.delete("/:id", async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);

        res.json({
            message: "Customer deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete customer",
            error: error.message
        });
    }
});

module.exports = router;
// Update Customer
router.put("/:id", async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update customer",
            error: error.message
        });
    }
});