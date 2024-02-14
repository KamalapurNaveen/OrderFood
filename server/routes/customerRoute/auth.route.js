const express = require("express")
const route = express.Router()

const { customerSignup, customerLogin, customerLogout, customerForgotPasswordSendOTP, customerForgotPasswordVerifyOTP, customerForgotPasswordUpdate } = require("../../controllers/customer")

route.post("/signup", customerSignup)
route.post("/login" , customerLogin)
route.get("/logout", customerLogout)
route.get("/forgot_password_send_otp", customerForgotPasswordSendOTP)
route.get("/forgot_password_verify_otp", customerForgotPasswordVerifyOTP)
route.put("/forgot_password_update", customerForgotPasswordUpdate)

module.exports = route