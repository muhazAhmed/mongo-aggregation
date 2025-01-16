const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { customer, total, items, city } = req.body;

    const newOrder = new Order({
      customer,
      total,
      items,
      city,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder };
