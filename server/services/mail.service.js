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
            html : `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Change OTP</title>
                </head>
                <body style="font-family: Arial, sans-serif;">
                
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #333;">Password Change OTP</h2>
                    <div style="border: 2px solid red; background-color: yellow; padding: 10px; margin-bottom: 20px;">
                        <p style="color: red; font-weight: bold;">Warning:</p>
                        <p style="color: red;">Please keep this OTP confidential and do not share it with anyone.</p>
                    </div>
                    <p>Your OTP for changing the password is: <strong>${otp}</strong></p>
                    <p>If you have any questions or concerns, feel free to contact us.</p>
                    <p>Best regards,</p>
                    <p>IT Team QR-It</p>
                </div>
                
                </body>
                </html>
            `
        }).then(data =>{
            console.log(`MailSent -  to:${email} otp:${otp}`)
        })
    }catch(err){
        throw err
    }
}

async function sendEmployeePinMail({email, name, pin}){
    try {
        transporter.sendMail({
            from: NODEMAILER_EMAIL,
            to: email,
            subject: "Employee Secret Password",
            html : `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Employee Password</title>
                </head>
                <body style="font-family: Arial, sans-serif;">
                
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <h2 style="color: #333;">Employee Secret Password</h2>
                        <div style="border: 2px solid red; background-color: yellow; padding: 10px; margin-bottom: 20px;">
                            <p style="color: red; font-weight: bold;">Warning:</p>
                            <p style="color: red;">Please keep this pin confidential and do not share it with anyone.</p>
                        </div>
                        <p>Hello ${name},</p>
                        <p>Your employee secret password is: <strong>${pin}</strong></p>
                        <p>If you have any questions or concerns, feel free to contact us.</p>
                        <p>Best regards,</p>
                        <p>IT Team QR-It</p>
                    </div>
                
                </body>
                </html>            
            `
        }).then(data =>{
            console.log(`MailSent -  to:${email} pin:${pin}`)
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
    sendEmployeePinMail,
    createHash,
    verifyHash,
}