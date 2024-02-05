const { EmployeeModel } = require("../models")
const auth = require("../services/auth.service")
const employeeInteractor  = require("../interactors/employee")

async function employeeSignup(req, res){
    console.log(req.body)
    const { name, email, mobile, password } = req.body;
    try {
        await employeeInteractor.registerEmployee({ name, email, mobile, password, auth, EmployeeModel })
        res.status(201).send({success : true, message : "Created"})
    } catch(err) {
        res.status(500).send({success : false, message : err.message})
    }
}   

async function employeeLogin(req, res){
    const { email, password } = req.body;
    try {
        const setCookie = await employeeInteractor.loginEmployee({ email, password, auth, EmployeeModel })
        setCookie(res)
        res.status(200).send({success : true, message : "Authorized"})
    } catch(err) {
        res.status(500).send({success : false, message : err.message})
    }    
}   

async function employeeLogout(_, res){
    try {
        const clearCookie = await employeeInteractor.logoutEmployee();
        clearCookie(res)
        res.send(200).send({success : true, message : "Done"})
    } catch (err){
        res.send(500).send({success : true, message : err.message})
    }
}

module.exports = {employeeSignup, employeeLogin, employeeLogout}