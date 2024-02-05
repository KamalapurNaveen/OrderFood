const express = require("express")
const route = express.Router()

const { employeeSignup, employeeLogin, employeeLogout } = require("../../../controllers/employee")
route.post("/signup", employeeSignup)
route.post("/login" , employeeLogin)
route.get("/logout", employeeLogout)

module.exports = route