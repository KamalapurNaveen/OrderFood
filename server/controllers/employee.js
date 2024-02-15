const { EmployeeModel, ItemModel, OrderModel, CustomerModel, WalletModel } = require("../models")

const auth = require("../services/auth.service")
const mail = require("../services/mail.service")

const storage = require('../services/storage.service')
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

async function getUserInfo(req,res){
    try {
        const id = req.sessionData.id
        const info = await employeeInteractor.getProfileInfo({id, EmployeeModel})
        res.status(200).send({success : true, info })
    }catch(err){
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

async function getCustomerById(req,res){
    try {
        const id = req.query.id
        const info = await employeeInteractor.getCustomerById({id, CustomerModel})
        res.status(200).send({success : true, data:info })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}
async function addMoneyToWallet(req,res){
    try {
        const wallet_id = req.query.id
        const amount=req.query.amount;
         await employeeInteractor.addMoneyToWallet({wallet_id, amount,WalletModel})
        res.status(200).send({success : true, message : "Amount added successfully"})
    }catch(err){
        console.log(err)
        res.status(500).send({success : false, message : err.message})
    }
}

async function addItems(req, res){
    try{
        const items = req.body
        await itemInteractor.addItem({items, imageName : req.file.filename, imagePath : req.file.path, ItemModel, storage})
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
async function getItem(req,res){
    try{
        const itemId = req.query.id
        const item=await itemInteractor.getItem({itemId, ItemModel})
       // console.log(itemId,item)
        res.status(200).send({success : true, data:item})
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}
async function updateItemInfo(req,res){
    try{
        const itemInfo=req.body.item;
        const updatedItemInfo=await itemInteractor.updateItemInfo({itemInfo,ItemModel});
        res.status(200).send({success : true, data : { item : updatedItemInfo } })
    }
    catch(err){
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
        const updatedOrderInfo = await orderInteractor.updateOrderInfo({orderInfo, OrderModel, CustomerModel, WalletModel})
        res.status(200).send({success : true, data : { order : updatedOrderInfo } })
    }catch(err){
        console.log(err)
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

async function getQueueStats(req, res){
    try {
        const stats = await orderInteractor.getQueueStats({OrderModel, ItemModel})
        res.status(200).send({success : true, data : stats })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function employeeForgotPasswordSendOTP(req, res){
    try{
        const email = req.query.email
        const hash = await employeeInteractor.sendOTP({email, EmployeeModel, mail})
        res.status(200).send({success : true, hash })        
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function employeeForgotPasswordVerifyOTP(req, res){
    try{
        const {otp, hash, email} = {...req.query}
        const response = await employeeInteractor.verifyOTP({otp, hash, email, mail})
        res.status(200).send({success : true, data : response })        
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }   
}

async function employeeForgotPasswordUpdate(req, res){
    try{
        const {password, hash, email, otp} = {...req.body}
        const response = await employeeInteractor.updateOTPPassword({password, hash, email, otp, EmployeeModel, mail, auth})
        res.status(200).send({success : true, data : response })        
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }   
}

module.exports = {
    signup, 
    login, 
    logout,
    getUserInfo,
    getCustomerById,
    addMoneyToWallet,
    addItems,
    getAllItems,
    deleteItem,
    getItem,
    updateItemInfo,
    getOrderInfo,
    updateOrderInfo,
    getOrderHistory,
    getOrderQueue,
    getQueueStats,
    employeeForgotPasswordSendOTP,
    employeeForgotPasswordVerifyOTP,
    employeeForgotPasswordUpdate,
}