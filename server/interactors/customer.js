async function registerCustomer({
    name, email, mobile, password, auth, CustomerModel, WalletModel
}){
    var user = await CustomerModel.findOne({email});
    if(!user){
        var credentials  = await auth.createHash({password})
        const wid = await WalletModel.create({ transactions : [] })
        await CustomerModel.create({name, email, mobile, password, ...credentials, wallet_id : wid._id})
    }else{
        throw new Error('email already exists')
    }
}

async function loginCustomer({ email, password, auth, CustomerModel }){
    var user = await CustomerModel.findOne({email});
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
            const token = await auth.createJWT({id : user._id,name : user.name, email, wallet_id : user.wallet_id, type : "customer" })
            return function setCookie(res){
                res.cookie("access_token", token, { sameSite: 'Lax', expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) });
            }
        }
    }
}

async function logoutCustomer(){
    return function clearCookie(res) {
        res.clearCookie("access_token")
    }
}

async function getProfileInfo({id, CustomerModel}){
    const {_id, email, name, mobile}  = await CustomerModel.findById(id)
    return {id, email, name, mobile};
}
async function getInfoById({id, CustomerModel}){
    const {_id, email, name, wallet_id}  = await CustomerModel.findById(id)
    return {id, email, name, wallet_id};
}

async function updatePassword({id, currentPassword, newPassword, CustomerModel, auth}){
    var user = await CustomerModel.findById(id);
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
            await CustomerModel.updateOne({_id : id}, {...credentials})
        }
    }
}

async function sendOTP({email, CustomerModel, mail}){
    var user = await CustomerModel.findOne({email});
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

async function updateOTPPassword({password, hash, email, otp, CustomerModel, mail, auth}){
    const valid = await mail.verifyHash({ otp, email, hash })
    if(!valid){
        throw Error('something went wrong')
    }else{
        var user = await CustomerModel.findOne({email}, {});
        var credentials  = await auth.createHash({ password  })
        await CustomerModel.updateOne({_id : user._id}, {...credentials})
    }
}

module.exports = {
    registerCustomer, 
    loginCustomer, 
    logoutCustomer, 
    getProfileInfo, 
    getInfoById,
    updatePassword,
    sendOTP,
    verifyOTP,
    updateOTPPassword,
}