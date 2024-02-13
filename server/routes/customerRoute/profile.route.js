const express = require("express")
const route = express.Router()

const { getUserInfo, updatePassword } = require("../../controllers/customer")

route.get("/", getUserInfo)
route.put("/update_password", updatePassword)

module.exports = route