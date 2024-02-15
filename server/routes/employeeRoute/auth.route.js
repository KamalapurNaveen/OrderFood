const express = require("express")
const route = express.Router()

const { signup, login, logout, employeeForgotPasswordSendOTP, employeeForgotPasswordVerifyOTP, employeeForgotPasswordUpdate } = require("../../controllers/employee")
route.post("/signup", signup)
route.post("/login" , login)
route.get("/logout", logout)
route.get("/forgot_password_send_otp", employeeForgotPasswordSendOTP)
route.get("/forgot_password_verify_otp", employeeForgotPasswordVerifyOTP)
route.put("/forgot_password_update", employeeForgotPasswordUpdate)


module.exports = route