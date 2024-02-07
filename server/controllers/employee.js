const { EmployeeModel, ItemModel, OrderModel } = require("../models")
const auth = require("../services/auth.service")
const employeeInteractor  = require("../interactors/employee")
const itemInteractor = require("../interactors/item")
const orderInteractor = require("../interactors/order")

async function signup(req, res){
    console.log(req.body)
    const { name, email, mobile, password } = req.body;
    try {
        await employeeInteractor.registerEmployee({ name, email, mobile, password, auth, EmployeeModel })
        res.status(201).send({success : true, message : "Created"})
    } catch(err) {
        res.status(500).send({success : false, message : err.message})
    }
}   

async function login(req, res){
    const { email, password } = req.body;
    try {
        const setCookie = await employeeInteractor.loginEmployee({ email, password, auth, EmployeeModel })
        setCookie(res)
        res.status(200).send({success : true, message : "Authorized"})
    } catch(err) {
        res.status(500).send({success : false, message : err.message})
    }    
}   

async function logout(_, res){
    try {
        const clearCookie = await employeeInteractor.logoutEmployee();
        clearCookie(res)
        res.status(200).send({success : true, message : "Done"})
    } catch (err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function getAllItems(req,res){
    try{
        const items = await itemInteractor.getAllItems({ItemModel})
        res.status(200).send({success : true, data : {items}})
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function addItems(req, res){
    try{
        const items = req.body.items
        await itemInteractor.addItem({items, ItemModel})
        res.status(200).send({success : true, message : "Added Items"})
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function deleteItem(req,res){
    try{
        const itemId = req.query.id
        await itemInteractor.deleteItem({itemId, ItemModel})
        res.status(200).send({success : true, message : "Deleted Item"})
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function getOrderInfo(req,res){
    try{
        const id = req.query.id
        const order = await orderInteractor.getOrderInfo({id, OrderModel})
        res.status(200).send({success : true, data : { order } })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}
async function updateOrderInfo(req,res){
    try {
        const orderInfo = req.body.order
        const updatedOrderInfo = await orderInteractor.updateOrderInfo({orderInfo, OrderModel})
        res.status(200).send({success : true, data : { order : updatedOrderInfo } })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function getOrderHistory(req,res){
    try {
        const orders = await orderInteractor.getOrderHistory({OrderModel})
        res.status(200).send({success : true, data : { orders } })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}
async function getOrderQueue(req,res){
    try {
        const orders = await orderInteractor.getOrderQueue({OrderModel})
        res.status(200).send({success : true, data : { orders } })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

module.exports = {
    signup, 
    login, 
    logout,
    addItems,
    getAllItems,
    deleteItem,
    getOrderInfo,
    updateOrderInfo,
    getOrderHistory,
    getOrderQueue,
}