const express = require("express");
const routes = express.Router();

const User = require("./routes/userRoutes");
const Product = require("./routes/productRoutes")
const Cart = require("./routes/cartSchema")
const Order = require("./routes/orderSchema")
const Wishlist= require("./routes/wishlistRoutes")

routes.use("/user", User); // Starting endpoint-> /api/user
routes.use("/product", Product)
routes.use("/cart", Cart)
routes.use("/order", Order)
routes.use("/wishlist", Wishlist)

module.exports = routes;