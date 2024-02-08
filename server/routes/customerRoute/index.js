const express = require("express")
const route = express.Router()

const authRoute = require("./auth.route")
const itemRoute = require("./item.route")
const orderRoute = require("./order.route")

const {authenticateCustomer} = require("../../services/auth.service")

route.use("/auth", authRoute)
route.use("/item", authenticateCustomer, itemRoute)
route.use("/order", authenticateCustomer, orderRoute)

module.exports = route