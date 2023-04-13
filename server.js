const exp=require('express');
const app=exp();
const testRoute=require('./user-api');
const mc=require('mongodb').MongoClient;
const mongoose = require("mongoose");
const path=require('path');
const bodyparser = require("body-parser");
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

app.use(bodyparser.json());

app.use('/user',testRoute);

app.use((req,res)=>{
    res.send({message:`${req.url} is invalid!`});
});
 app.listen(8080,()=>{
                console.log("server listening on port 8080");
           }); 

// var dbUrl="mongodb+srv://baka:ittop@cluster0-ebc9w.mongodb.net/ecficio?retryWrites=true&w=majority";
// mc.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
//     if(err)
//     {
//         console.log("Err in db connect ",err);
//     }
//     else{
//         app.locals.dbObject=client;
//         console.log(client.db('ecficio'));
//         console.log('connected to mongodb');
//         app.listen(process.env.PORT || 8080,()=>{
//             console.log("server listening on port ",process.env.PORT);
//         });
//     }
// });
var dbUrl = "mongodb+srv://mounishjuvvadi:abcd@fitnessclub.exdzzg3.mongodb.net/?retryWrites=true&w=majority";
async function main() {
   
    const client = new MongoClient(dbUrl);

    try {
        // Connect to the MongoDB cluster
         await client.connect()
         app.locals.dbObject=client;
        // c.db('finess').collection('users').find().toArray(function(err, docs) {
        //     console.log(JSON.stringify(docs));
        // });
        //console.log(c.db('finess').collection('users').collectionName);
        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } 
}


main().catch(console.error);


async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
