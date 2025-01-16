const express = require("express");
const router = express.Router();
const { createOrder } = require("./controllers/orderController");

router.post("/orders", createOrder);
// router.get("/sales-by-city", getSalesByCity);

module.exports = router;
