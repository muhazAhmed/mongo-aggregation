const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: String,
  total: Number,
  items: [String],
  city: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
