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
    return res.status(500).json({ message: error.message });
  }
};

const getSalesByCity = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      { $group: { _id: "$city", totalSales: { $sum: "$total" } } },
    ]);
    res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: "$customer",
          totalSpent: { $sum: "$total" },
          orderID: { $push: "$_id" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
    ]);
    return res.status(200).json(topCustomers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPopularItems = async (req, res) => {
  try {
    const popularItems = await Order.aggregate([
      { $unwind: "$items" }, // Break array into multiple documents
      { $group: { _id: "$items", count: { $sum: 1 } } }, // Count occurrences of each item
      { $sort: { count: -1 } }, // Sort by count in descending order
    ]);
    res.status(200).json(popularItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getSalesByCity, getTopCustomers, getPopularItems };
