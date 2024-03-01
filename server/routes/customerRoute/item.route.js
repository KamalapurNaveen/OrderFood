const express = require("express")
const route = express.Router()

const {getAllItems, searchItem} = require("../../controllers/customer")

route.get("/", getAllItems)
route.get("/search", searchItem)

module.exports = route