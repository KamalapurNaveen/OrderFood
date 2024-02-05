const path = require('path')
const express = require('express')

const PORT = require("./config").PORT
const homeRoute = require('./routes/homeRoute')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})