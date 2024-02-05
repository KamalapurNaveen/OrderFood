const {CustomerModel, WalletModel} = require("../models")
const auth = require("../services/auth.service")
const customerInteractor  = require("../interactors/customer")

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

module.exports = {customerSignup, customerLogin, customerLogout}