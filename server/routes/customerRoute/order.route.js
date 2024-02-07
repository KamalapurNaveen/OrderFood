const express = require("express")
const route = express.Router()

const { addOrder, cancelOrder, getHistory } = require("../../controllers/customer")

route.post("/add", addOrder)
route.get("/cancel", cancelOrder)
route.get("/history", getHistory)

module.exports = route