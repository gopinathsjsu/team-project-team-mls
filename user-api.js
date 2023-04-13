const exp=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const testRouter=exp.Router();
const nodemailer=require('nodemailer');
const emailExistence=require('email-existence');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
ObjectId = require('mongodb').ObjectID;

//to check whether the mail exists or not
testRouter.use(exp.json());
testRouter.post('/validEmail',(req,res,next)=>{
    // emailExistence.check(req.body.email, function(error,response){
    //     res.send(response);
	// });
    return true;
});

//sending mail
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
    });
};
smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'jmounish111@gmail.com',
        pass: 'Password@1'
    },
    tls: {
        rejectUnauthorized: false
    }
}));

//to store image in cloudinary
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");
//credentials
cloudinary.config({
  cloud_name: "dzb4lmyme",
  api_key: "511935753193731",
  api_secret: "7A9DTSkYf6oJZua-GGILeRsV_dg",
});
//set storage
var storage =  new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "user-profiles",
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(undefined, file.fieldname + "-" + Date.now());
  }
});

//Configure multer middleware
var upload = multer({ storage: storage });

//to subscribe the user
testRouter.use(exp.json());
testRouter.post('/subscribe',(req,res,next)=>{
});

//to register the user
testRouter.use(exp.json());
testRouter.post('/join',(req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');
    console.log(req.body);
    console.log(JSON.stringify(req.body.email),typeof(JSON.stringify(req.body.email)));
    dbo.collection('users').findOne({name:req.body.name},(err,obj)=>{
        if(err){
            console.log('error at user-api:',err);
            next(err);
        }
        if(obj!=null){
            res.send({message:'user exists'});
        }
        else{
            bcrypt.hash(req.body.password,7,(err,hashedPass)=>{
                if(err){
                    next(err);
                }
                req.body.password=hashedPass;
                dbo.collection('users').insertOne(req.body,(err,sucess)=>{
                    if(err){
                        next(err);
                    }
                    res.send({message:'user created'});
                });
            });
        }
    });
});


//to return courses of a particular user
testRouter.use(exp.json());
testRouter.post('/mycourses',(req,res,next)=>{

});

//to return details of a user
testRouter.use(exp.json());
testRouter.post('/profileRead',(req,res,next)=>{

});


//to validate user during login
testRouter.use(exp.json());
testRouter.post('/login',(req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');
    dbo.collection('users').findOne({username:req.body.username},(err,obj)=>{
        if(err){
            console.log('error at user-api:',err);
            next(err);
        }
        if(obj==null){
            res.send({message:'invalid username'});
        }
        else{
            bcrypt.compare(req.body.password,obj.password,(err,isMatched)=>{
                if(err){
                    next(err);
                }
                if(isMatched==false){
                    res.send({message:'invalid password'});
                }
                else{
                    jwt.sign({username:obj.username},"abcdef",{expiresIn: 604800},(err,signedToken)=>{
                        if(err){
                            next(err);
                        }
                        res.send({message:'success',token:signedToken,username:obj.username});
                    });
                }
            });
        }
    });
});


//to update about of user profile
testRouter.use(exp.json());
testRouter.post('/updateAbout', (req,res,next)=>{

});

//to update the dp of user
testRouter.use(exp.json());
testRouter.post('/dpUpdate',upload.single('photo'),(req,res,next)=>{

});

//to update details of the user in profile page
testRouter.use(exp.json());
testRouter.post('/profileUpdate',(req,res,next)=>{

});



//to change password of the user
testRouter.use(exp.json());
testRouter.post('/changePassword',(req,res,next)=>{
  
});


//to send mail to user(forgot password)
testRouter.use(exp.json());
testRouter.post('/forgotpass',(req,res,next)=>{
    
});


//to post blog by user
testRouter.use(exp.json());
testRouter.post('/postBlog',upload.single('blog'),(req,res,next)=>{

});

//to get blog data
testRouter.use(exp.json());
testRouter.post('/getBlogs',(req,res,next)=>{

});


//to get blog data by id
testRouter.use(exp.json());
testRouter.post('/getBlogById',(req,res,next)=>{

});


//to post classes
testRouter.use(exp.json());
testRouter.post('/postClass',upload.single('classes'),(req,res,next)=>{
    
});

//to get all courses data
testRouter.use(exp.json());
testRouter.post('/getClass',(req,res,next)=>{


})


//to get course data by id
testRouter.use(exp.json());
testRouter.post('/getClassbyId',(req,res,next)=>{

});


//to enroll to the course
testRouter.use(exp.json());
testRouter.use('/enrollClass',(req,res,next)=>{

    });




//if there is any logical errors in code
testRouter.use((err,req,res,next)=>{
    res.send({message:err.message});
});

module.exports=testRouter;