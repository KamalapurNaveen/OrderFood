const express = require("express")
const route = express.Router()

const { customerSignup, customerLogin, customerLogout } = require("../../../controllers/customer")
route.post("/signup", customerSignup)
route.post("/login" , customerLogin)
route.get("/logout", customerLogout)

module.exports = route