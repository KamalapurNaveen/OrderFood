const express = require("express")
const { getUserInfo, getCustomerById, addMoneyToWallet } = require("../../controllers/employee")
const route = express.Router()


route.get("/", getUserInfo)
route.get("/customer", getCustomerById);
route.put('/customer/wallet',addMoneyToWallet)
module.exports = route