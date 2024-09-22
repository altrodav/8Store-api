const express = require("express");
const route = express.Router();

const User = require("./routes/userRoutes")

route.use("/user",User); // Starting endpoint-> /api/user

module.exports = route;