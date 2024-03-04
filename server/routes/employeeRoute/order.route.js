const express = require("express")
const route = express.Router()

const { getOrderInfo, updateOrderInfo, getOrderHistory, getOrderQueue, getQueueStats, getHistoryStats} = require("../../controllers/employee")

route.get("/" , getOrderInfo)
route.put("/", updateOrderInfo)
route.get("/history", getOrderHistory)
route.get("/queue" , getOrderQueue)
route.get("/queue/stats", getQueueStats)
route.get("/history/stats", getHistoryStats)

module.exports = route