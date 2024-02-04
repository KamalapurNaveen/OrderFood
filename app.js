const path = require('path')
const express = require('express')

const PORT = require("./config").PORT
const homeRoute = require('./routes/homeRoute')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',homeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})