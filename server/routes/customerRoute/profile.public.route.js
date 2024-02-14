const express = require("express")
const { getInfoById } = require("../../controllers/customer")
const route = express.Router()

route.get('/',getInfoById)

module.exports = route