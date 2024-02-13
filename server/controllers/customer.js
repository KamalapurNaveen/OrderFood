const {CustomerModel, ItemModel, OrderModel, WalletModel} = require("../models")
const auth = require("../services/auth.service")
const mail = require("../services/mail.service")

const customerInteractor = require("../interactors/customer")
const itemInteractor  = require("../interactors/item")
const orderIntractor  = require("../interactors/order")
const walletIntractor  = require("../interactors/wallet")

async function customerSignup(req, res){
    const { name, email, mobile, password } = req.body;
    try {
        await customerInteractor.registerCustomer({ name, email, mobile, password, auth, CustomerModel, WalletModel })
        res.status(201).send({success : true, message : "Created"})
    } catch(err) {
        var statusCode = 500
        if (err.message === 'invalid email' || err.message === 'invalid password') {
            statusCode =  401
        }
        res.status(statusCode).send({success : false, message : err.message})
    }
}   

async function customerLogin(req, res){
    const { email, password } = req.body;
    try {
        const setCookie = await customerInteractor.loginCustomer({ email, password, auth, CustomerModel })
        setCookie(res)
        res.status(200).send({success : true, message : "Authorized"})
    } catch(err) {
        var statusCode = 500
        console.log(err.message, req.body)
        if (err.message === 'invalid email' || err.message === 'invalid password') {
            statusCode =  401
        }
        res.status(statusCode).send({success : false, message : err.message})
    }    
}   

async function customerLogout(_, res){
    try {
        const  clearCookie = customerInteractor.logoutCustomer()
        clearCookie(res)
        res.send(200).send({success : true, message : "Done"})
    } catch (err){
        res.send(500).send({success : true, message : err.message})
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

async function addOrder(req,res){
    try {
        const order = req.body
        const walletId = req.sessionData.wallet_id
        const userName = req.sessionData.name
        const userId = req.sessionData.id

        const walletStatus = await orderIntractor.addCustomerOrder({order, walletId,userId, userName,  OrderModel, WalletModel})
        res.status(200).send({success : true, data: {walletStatus}})
    }catch(err){
        console.log(err)
        res.status(500).send({success : false, message : err.message})
    }
}

async function cancelOrder(req, res){
    try {
        const walletId = req.sessionData.wallet_id
        const orderId = req.query.orderId
        
        const response = await orderIntractor.cancelCustomerOrder({orderId, walletId, WalletModel, OrderModel})
        res.status(200).send(response)
    }catch(err){
        console.log(err)
        res.status(500).send({success : false, message : err.message})
    }
}
async function getHistory(req, res){
    const walletId = req.sessionData.wallet_id
    
    try{
        const history = await orderIntractor.getCustomerOrderHistory({walletId, WalletModel, OrderModel});
        res.status(200).send({success : true, history })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function getTransactions(req, res){
    const walletId = req.sessionData.wallet_id

    try {
        const wallet = await walletIntractor.getTransactions({walletId, WalletModel})
        res.status(200).send({success : true, wallet })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}
async function getUserInfo(req,res){
    try {
        const id = req.sessionData.id
        const info = await customerInteractor.getProfileInfo({id, CustomerModel})
        res.status(200).send({success : true, info })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function updatePassword(req, res){
    try{
        const id = req.sessionData.id
        const {currentPassword, newPassword} = { ...req.body }
        await customerInteractor.updatePassword({id, currentPassword, newPassword, CustomerModel, auth})
        res.status(200).send({success : true, message : 'Your password has been changed successfully' })        
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function customerForgetPasswordSendOTP(req, res){
    try{
        const email = req.query.email
        const hash = await customerInteractor.sendOTP({email, CustomerModel, mail})
        res.status(200).send({success : true, hash })        
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function customerForgetPasswordVerifyOTP(req, res){
    try{
        const {otp, hash, email} = {...req.query}
        const response = await customerInteractor.verifyOTP({otp, hash, email, mail})
        res.status(200).send({success : true, data : response })        
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }   
}

async function customerForgetPasswordUpdate(req, res){
    try{
        const {password, hash, email, otp} = {...req.body}
        const response = await customerInteractor.updatePassword({password, hash, email, otp, CustomerModel, mail, auth})
        res.status(200).send({success : true, data : response })        
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }   
}

module.exports = {
    customerSignup, 
    customerLogin, 
    customerLogout, 
    customerForgetPasswordSendOTP, 
    customerForgetPasswordVerifyOTP, 
    customerForgetPasswordUpdate,
    getAllItems,
    addOrder,
    cancelOrder,
    getHistory,
    getTransactions,
    getUserInfo,
    updatePassword,
}