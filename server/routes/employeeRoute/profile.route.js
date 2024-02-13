const express = require("express")
const { getUserInfo } = require("../../controllers/employee")
const route = express.Router()


route.get("/", getUserInfo)

module.exports = route