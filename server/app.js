const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');

const PORT = require("./config").PORT
const MONGO_URL = require("./config").MONGO_URL

const apiRoute = require("./routes/index")
const initDB = require("./database/init")
initDB(MONGO_URL)
const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cookieParser())
app.use(cors(corsOptions));  
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", apiRoute)
app.use((_,res)=>{
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})