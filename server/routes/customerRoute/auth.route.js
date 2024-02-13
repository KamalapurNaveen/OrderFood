const express = require("express")
const route = express.Router()

const { customerSignup, customerLogin, customerLogout, customerForgetPasswordSendOTP, customerForgetPasswordVerifyOTP, customerForgetPasswordUpdate } = require("../../controllers/customer")
route.post("/signup", customerSignup)
route.post("/login" , customerLogin)
route.get("/logout", customerLogout)
route.get("/forget_password_send_otp", customerForgetPasswordSendOTP)
route.get("/forget_password_verify_otp", customerForgetPasswordVerifyOTP)
route.put("/forget_password_update", customerForgetPasswordUpdate)

module.exports = route