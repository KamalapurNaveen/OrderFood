const express = require("express")
const route = express.Router()

const { getUserInfo } = require("../../controllers/customer")

route.get("/", getUserInfo)

module.exports = route