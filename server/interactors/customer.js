async function registerCustomer({
    name, email, mobile, password, auth, CustomerModel, WalletModel
}){
    var user = await CustomerModel.findOne({email});
    if(!user){
        var credentials  = await auth.createHash({email, password})
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


module.exports = {
    registerCustomer, loginCustomer, logoutCustomer
}