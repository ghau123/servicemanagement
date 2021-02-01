
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

const cors = require("cors");



const mongoose = require('mongoose')
const { events } = require('../models/user')
const user = require('../models/user')

// const db="//localhost:27017/eventDb"
const db="mongodb://localhost:27017/eventDb"

//password encrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';



function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token ==='null'){
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token,'secretkey')
  if(!payload){
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}



mongoose.Promise = global.Promise;

  mongoose.connect(db,err => {
     if(err){
        console.error('Error!!'+ err )
    }else{
       console.log('connected to mongoDb')
    }
 })


router.post('/signUp',(req,res)=>{
   let userData = req.body 
   let user = new User(userData)
   user.save((error,registeredUser)=>{
   if(error){
       console.log("error ")
   } else{
       let payload = {subject:registeredUser._id}
       let token = jwt.sign(payload,'secretkey')
       res.status(200).send({token})
   }
})
})
router.post('/login',(req,res)=>{
    let userData = req.body 

    User.findOne({email: userData.email}, (error, user)=>{
        if(error){
            console.log(error)
        } else{
            if(!user){
                res.status(401).send('Invalid email')
            } else
            if(user.password !== userData.password){
                res.status(401).send('Invalid password')
            }else {
                let payload = {subject:user._id}
                let token = jwt.sign(payload,'secretkey')
                res.status(200).send({token})
            }
        }
    })

})
router.get('/',function(req,res){
  res.send('api works')
});



router.get('/check' ,verifyToken,(req,res)=>{
  let info =[
    {
      "_id":"1",
      "name":"gautham",
      "age":"22"
    }
  ]
 res.json(info)
})

router.get('/listUser',verifyToken,function(req,res){
  // console.log('get request for all users');
  user.find({})
  .exec(function(err, user){
    if(err){
      console.log("error retrive user info")
    } else{
      res.json(user)
    }
  })
});

router.get('/admin',(req,res)=>{
    
    let events = [
        { 
            "name":"Gautham", 
            "age":22, 
            "address":{
                  "street":"1 Main St",
                  "city": "Montreal"
            },
            "interests": ["do nothing", "biking"]
          },
        
    ]
    res.json(events)
})









module.exports = router