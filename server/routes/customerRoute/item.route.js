const express = require("express")
const route = express.Router()

const {getAllItems} = require("../../controllers/customer")

route.get("/", getAllItems)

module.exports = route