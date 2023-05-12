const exp=require('express');
const app=exp();
const testRoute=require('./user-api');
const mc=require('mongodb').MongoClient;
const mongoose = require("mongoose");
const path=require('path');
const bodyparser = require("body-parser");
const { MongoClient } = require('mongodb');
const cors = require('cors')

// var corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors());
app.use(exp.static(path.join(__dirname,'./dist/my-health-club')));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.use(bodyparser.json());

app.use('/user',testRoute);

app.use((req,res)=>{
    res.send({message:`${req.url} is invalid!`});
});
 app.listen(8080,()=>{
                console.log("server listening on port 8080");
           });