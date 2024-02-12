const express = require("express")
const route = express.Router()

const { getTransactions } = require("../../controllers/customer")

route.get("/transactions", getTransactions)

module.exports = route