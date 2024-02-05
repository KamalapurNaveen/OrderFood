const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const PORT = require("./config").PORT
const MONGO_URL = require("./config").MONGO_URL

const apiRoute = require("./routes/index")
const initDB = require("./database/init")
const app = express();

initDB(MONGO_URL)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", apiRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})