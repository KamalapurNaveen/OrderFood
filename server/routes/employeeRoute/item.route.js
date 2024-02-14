const express = require("express")
const route = express.Router()

const {getAllItems, addItems, deleteItem,updateItemInfo, getItem} = require("../../controllers/employee")
const { addItemMiddleware } = require('../../util/multer.middleware')

route.get("/", getAllItems)
route.get('/id',getItem);
route.put("/",updateItemInfo);
route.post("/add", addItemMiddleware, addItems)
route.get("/delete" , deleteItem)

module.exports = route