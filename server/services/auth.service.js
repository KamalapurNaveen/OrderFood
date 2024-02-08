var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const key = require("../config").JWT_KEY

async function createHash({password}){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
    return {hash, salt}
}

async function verifyUser({ password, hash, salt}) {
    const hashToVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
    return hashToVerify === hash;
}

async function createJWT(data){
    return jwt.sign(data, key)
}

async function authenticate(type ,req, res, next){
    const token = req.cookies?.access_token;
    if (!token) {
        return res.status(403).send({success : false, message : "Bad Request"})
    }

    try {
        const data = jwt.verify(token, key)
        if(data?.type !== type){
            return res.status(403).send({success : false, message : "Bad Request"})
        }
        Object.assign(req, {sessionData : data})
        next();
    } catch(err) {
        return res.status(500).send({success : false, message : "Internal Server Error"})
    }
} 

async function authenticateCustomer(req, res, next){
    authenticate('customer', req, res, next)
}

async function authenticateEmployee(req, res, next){
    authenticate('employee', req, res, next)
}

module.exports = {
    createHash, 
    createJWT, 
    verifyUser, 
    authenticateCustomer, 
    authenticateEmployee 
}