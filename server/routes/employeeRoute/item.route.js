const express = require("express")
const route = express.Router()

const {getAllItems, addItems, deleteItem} = require("../../controllers/employee")

route.get("/", getAllItems)
route.post("/add", addItems)
route.get("/delete" , deleteItem)

module.exports = route