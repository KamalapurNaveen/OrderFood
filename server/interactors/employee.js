const { EmployeeModel } = require("../models");

async function registerEmployee({
    name, email, mobile, password, auth, EmployeeModel
}){
    var user = await EmployeeModel.findOne({email});
    if(!user){
        var credentials  = await auth.createHash({email, password})
        await EmployeeModel.create({ name, email, mobile, password, ...credentials })
    }else{
        throw new Error('email already exists')
    }
}

async function loginEmployee({ email, password, auth, EmployeeModel }){
    var user = await EmployeeModel.findOne({email});
    if(!user){
        throw new Error('invalid email')
    }else {
        var valid = await auth.verifyUser({
            password, 
            salt  : user.salt, 
            hash : user.hash
        })
        if(!valid) {
            throw new Error('invalid password')
        } else {
            const token = await auth.createJWT({id : user._id, email, type : "employee" })
            return function setCookie(res){
                res.cookie("access_token", token, { sameSite: 'Lax', expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) })
            }
        }
    }
}

async function logoutEmployee(){
    return function clearCookie(res) {
        res.clearCookie("access_token")
    }
}

async function getProfileInfo({id, CustomerModel}){
    const {_id, email, name }  = await EmployeeModel.findById(id)
    return {id, email, name};
}

module.exports = {
    registerEmployee, loginEmployee, logoutEmployee,getProfileInfo
}