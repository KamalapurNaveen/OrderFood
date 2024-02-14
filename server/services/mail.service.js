const crypto = require('crypto');
const nodemailer = require("nodemailer");

const key = require("../config").FORGET_PASSWORD_KEY; 
const { NODEMAILER_EMAIL, NODEMAILER_PWD } = require('../config');
 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PWD,
    },
});

async function sendMail({email, otp}){
    try {
        transporter.sendMail({
            from: NODEMAILER_EMAIL,
            to: email,
            subject: "Password Change OTP",
            text: `The OTP for changing your password is : ${otp}`,
        }).then(data =>{
        })
    }catch(err){
        throw err
    }
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