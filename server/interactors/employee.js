const {rechargeWallet} = require('./wallet');

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

async function getProfileInfo({id, EmployeeModel}){
    const {email, name }  = await EmployeeModel.findById(id)
    return {id, email, name};
}

async function getCustomerById({id, CustomerModel}){
    const {email, name, wallet_id}  = await CustomerModel.findById(id)
    return {id, email, name, wallet_id};
}

async function addMoneyToWallet({userId, wallet_id,amount, otp, WalletModel, EmployeeModel}){
    const employee = await EmployeeModel.findById(userId)
    const empOTP = await employee.otp
    
    if(empOTP !== otp) {
        throw new Error('invalid employee pin!')
    }
    await rechargeWallet({wallet_id, amount, WalletModel})
}

async function updatePassword({id, currentPassword, newPassword, EmployeeModel, auth}){
    var user = await EmployeeModel.findById(id);
    if(!user){
        throw new Error('invalid user')
    }else {
        var valid = await auth.verifyUser({
            password : currentPassword, 
            salt  : user.salt, 
            hash : user.hash
        })
        if(!valid) {
            throw new Error('invalid password')
        } else {
            var credentials  = await auth.createHash({ password : newPassword })
            await EmployeeModel.updateOne({_id : id}, {...credentials})
        }
    }
}

async function sendOTP({email, EmployeeModel, mail}){
    var user = await EmployeeModel.findOne({email});
    if(!user){
        throw new Error('invalid email')
    }else {
        const otp = Math.floor(100000 + Math.random() * 900000)
        mail.sendMail({ email, otp})
        const hash = await mail.createHash({otp, email})
        return hash
    }
}

async function verifyOTP({otp, hash, email, mail}){
    const valid = await mail.verifyHash({ otp, email, hash })
    if(!valid){
        throw Error('invalid OTP')
    }else{
        return true
    }
}

async function updateOTPPassword({password, hash, email, otp, EmployeeModel, mail, auth}){
    const valid = await mail.verifyHash({ otp, email, hash })
    if(!valid){
        throw Error('something went wrong')
    }else{
        var user = await EmployeeModel.findOne({email}, {});
        var credentials  = await auth.createHash({ password  })
        await EmployeeModel.updateOne({_id : user._id}, {...credentials})
    }
}

module.exports = {
    registerEmployee, 
    loginEmployee, 
    logoutEmployee,
    getProfileInfo,
    getCustomerById,
    addMoneyToWallet,
    updatePassword,
    sendOTP,
    verifyOTP,
    updateOTPPassword,
}
