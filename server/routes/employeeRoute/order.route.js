const express = require("express")
const route = express.Router()

const { getOrderInfo, updateOrderInfo, getOrderHistory, getOrderQueue} = require("../../controllers/employee")
route.get("/" , getOrderInfo)
route.put("/", updateOrderInfo)
route.get("/history", getOrderHistory)
route.get("/queue" , getOrderQueue)

module.exports = route