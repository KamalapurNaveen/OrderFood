const express = require("express")
const route = express.Router()

const { getOrderInfo, updateOrderInfo, getOrderHistory, getOrderQueue, getQueueStats} = require("../../controllers/employee")
route.get("/" , getOrderInfo)
route.put("/", updateOrderInfo)
route.get("/history", getOrderHistory)
route.get("/queue" , getOrderQueue)
route.get("/queue/stats", getQueueStats)

module.exports = route