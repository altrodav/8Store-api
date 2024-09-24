const express = require("express");
const orderSchema = require("../modules/orderSchema");
const route = express.Router();

// The parent path of all is "*host-url*/api/orderSchema/*next-routes*"

route.get("/getUserOrders", async (req, res) => {
  try {
    const Id = req.query.Id;

    const result = await orderSchema.find({ userId: Id });
    res.status(200).json({ cart: result, success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

route.get("/getAllOrder", async (req, res) => {
  try {
    const result = await orderSchema.find({});

    res.status(200).json({ cart: result, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

route.post("/addOrder", async (req, res) => {
  try {
    const cart = await orderSchema.create({
      userId: req.body.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
      title: req.body.title,
      shortDiscription: req.body.shortDiscription,
      isDelivered: req.body.isDelivered,
      isPaymentDone: req.body.isPaymentDone,
    });
    res.status(200).json({ cart: cart, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = route;
