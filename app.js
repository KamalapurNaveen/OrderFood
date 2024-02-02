const express= require('express')
const path =require('path')
const homeRouter=require('./routes/homeRoute')
const app=express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.use('/',homeRouter);

app.listen(3000,()=> console.log("Server is running on port number 3000"))


