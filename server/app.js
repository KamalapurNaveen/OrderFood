const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const PORT = require("./config").PORT
const MONGO_URL = require("./config").MONGO_URL

const apiRoute = require("./routes/index")
const initDB = require("./database/init")
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};  
  
  
initDB(MONGO_URL)
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", apiRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})