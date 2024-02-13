const crypto = require('crypto');
const key = require("../config").FORGET_PASSWORD_KEY; 

async function sendMail({to, otp}){
    console.log(`MailSent -  to:${to} otp:${otp}`)
}

async function createHash({ otp, email }){ 
    return crypto.createHmac('sha256', key).update(`${otp}:${email}`).digest('hex')
}

async function verifyHash({ otp, email, hash }) {
    const expectedHash = await createHash({ otp, email });
    return hash === expectedHash;
}

module.exports = {
    sendMail,
    createHash,
    verifyHash,
}