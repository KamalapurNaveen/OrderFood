const express = require("express")
const route = express.Router()

const { signup, login, logout } = require("../../controllers/employee")
route.post("/signup", signup)
route.post("/login" , login)
route.get("/logout", logout)

module.exports = route