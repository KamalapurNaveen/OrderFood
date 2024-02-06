const express = require("express")
const route = express.Router()

const authRoute = require("./auth.route")
const itemsRoute = require("./item.route")
const orderRoute = require("./order.route")

route.use("/auth", authRoute)
route.use("/item", itemsRoute)
route.use("/order", orderRoute)

module.exports = route