const express = require("express")
const route = express.Router()

const customerRoute = require("./customerRoute")
const employeeRoute = require("./employeeRoute")

route.use('/_c', customerRoute)
route.use('/_e', employeeRoute)

module.exports = route