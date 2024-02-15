const express = require("express")
const { getUserInfo, getCustomerById, addMoneyToWallet, updatePassword } = require("../../controllers/employee")
const route = express.Router()


route.get("/", getUserInfo)
route.get("/customer", getCustomerById);
route.put('/customer/wallet',addMoneyToWallet)
route.put("/update_password", updatePassword)

module.exports = route