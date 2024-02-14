const express = require("express")
const route = express.Router()

const authRoute = require("./auth.route")
const itemRoute = require("./item.route")
const orderRoute = require("./order.route")
const walletRoute = require("./wallet.route")
const profileRoute = require("./profile.route")
const {authenticateCustomer} = require("../../services/auth.service")

route.use("/auth", authRoute)
route.use("/item", authenticateCustomer, itemRoute)
route.use("/order", authenticateCustomer, orderRoute)
route.use("/wallet", authenticateCustomer, walletRoute)
route.use("/profile", authenticateCustomer, profileRoute)

module.exports = route