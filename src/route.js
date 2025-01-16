const express = require("express");
const router = express.Router();
const { createOrder, getSalesByCity, getTopCustomers, getPopularItems } = require("./controllers/orderController");

router.post("/orders", createOrder);
router.get("/sales-by-city", getSalesByCity);
router.get("/top-customers", getTopCustomers);
router.get("/popular-items", getPopularItems);

module.exports = router;
