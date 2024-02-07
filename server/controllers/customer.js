const {CustomerModel, ItemModel, OrderModel, WalletModel} = require("../models")
const auth = require("../services/auth.service")

const customerInteractor = require("../interactors/customer")
const itemInteractor  = require("../interactors/item")
const orderIntractor  = require("../interactors/order")

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
        const order = req.body.order
        // const { walletId, userName } = req.sessionData
        // const userId = req.sessionData.id

        const walletId = '65c08db4504d89f35a81aea1'
        const userId="892192891" 
        const userName="TempUser"
        const walletStatus = await orderIntractor.addCustomerOrder({order, walletId,userId, userName,  OrderModel, WalletModel})
        res.status(200).send({success : true, data: {walletStatus}})
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

async function cancelOrder(req, res){
    try {
        // const walletId = req.sessionData.wallet_id
        const walletId = '65c08db4504d89f35a81aea1'
        const orderId = req.query.orderId
        
        const response = await orderIntractor.cancelCustomerOrder({orderId, walletId, WalletModel, OrderModel})
        res.status(200).send(response)
    }catch(err){
        console.log(err)
        res.status(500).send({success : false, message : err.message})
    }
}
async function getHistory(req, res){
    // const walletId = req.sessionData.wallet_id
    const walletId = '65c08db4504d89f35a81aea1'
    
    try{
        const history = await orderIntractor.getCustomerOrderHistory({walletId, WalletModel, OrderModel});
        res.status(200).send({success : true, history })
    }catch(err){
        res.status(500).send({success : false, message : err.message})
    }
}

module.exports = {
    customerSignup, 
    customerLogin, 
    customerLogout, 
    getAllItems,
    addOrder,
    cancelOrder,
    getHistory
}