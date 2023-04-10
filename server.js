const exp=require('express');
const app=exp();
const testRoute=require('./user-api');
const mc=require('mongodb').MongoClient;
const mongoose = require("mongoose");
const path=require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));
app.use(exp.static(path.join(__dirname,'./dist/fitnessClub')));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.use('/user',testRoute);

app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid!`});
});

var dbUrl = "mongodb+srv://mounishjuvvadi:abcd@fitnessclub.exdzzg3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(dbUrl, {useUnifiedTopology: true});
client.connect().then((client)=>{
    
        app.locals.dbObject=client;
        console.log('connected to mongodb');
        app.listen(process.env.PORT || 8080,()=>{
            console.log("server listening on port ",process.env.PORT);
        }); 
      
});
// mc.connect(dbUrl,{useUnifiedTopology:true},(err,client)=>{
//     console.log("ddd",client);
//     if(err)
//     {
//         console.log("Err in db connect ",err);
//     }
//     else{
//         app.locals.dbObject=client;
//         console.log('connected to mongodb');
//         app.listen(process.env.PORT || 8080,()=>{
//             console.log("server listening on port ",process.env.PORT);
//         });
//     }
// });


// const client = new MongoClient(dbUrl);
// async function connect() {
//     try {
//         await client.connect();
//         const db = client.db('fitness');
//         const coll = db.collection('users');
//         app.locals.dbObject=db;
//         //const cursor = coll.find();
//     // iterate code goes here
//     //await cursor.forEach(console.log);
//     //await mongoose.connect(dbUrl, {dbName: 'fitness'});
//     console.log(coll);
//     console.log("Connected to MongoDB");
//     } catch (error) {
//     console.error(error);
//     }
//     }
    
//     connect();
    
//     app.listen(8000, () => {
//     console.log("Server started on port 8000");
//     });
    