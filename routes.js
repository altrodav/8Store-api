const express = require("express");
const routes = express.Router();

const User = require("./routes/userRoutes");
const Product = require("./routes/productRoutes")

routes.use("/user", User); // Starting endpoint-> /api/user
routes.use("/product", Product)

module.exports = routes;