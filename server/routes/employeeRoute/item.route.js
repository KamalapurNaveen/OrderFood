const express = require("express")
const route = express.Router()

const {getAllItems, addItems, deleteItem,updateItemInfo, getItem} = require("../../controllers/employee")


route.get("/", getAllItems)
route.get('/id',getItem);
route.put("/",updateItemInfo);
route.post("/add", addItems)
route.get("/delete" , deleteItem)

module.exports = route