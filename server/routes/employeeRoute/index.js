const express = require("express")
const route = express.Router()

const authRoute = require("./auth.route")
const itemsRoute = require("./item.route")
const orderRoute = require("./order.route")
const profileRoute = require("./profile.route")
const {authenticateEmployee} = require("../../services/auth.service")

route.use("/auth", authRoute)
route.use("/item", authenticateEmployee, itemsRoute)
route.use("/order", authenticateEmployee, orderRoute)
route.use("/profile", authenticateEmployee, profileRoute)

module.exports = route