const express = require("express");
const routes = express.Router();

const User = require("./routes/userRoutes")

routes.use("/user",User); // Starting endpoint-> /api/user

module.exports = routes;