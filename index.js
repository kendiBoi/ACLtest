//const person=require('./person.js');
//const login=(req,res,next)=>{
//    next();}
const express = require('express');
const app =express();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const Users =require('./models/users');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const PORT =1000;
app.listen(PORT,()=>{
  console.log(`server${PORT}`)});
const mongoose = require('mongoose');
const connectionParams={
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
}
const URL="mongodb://mos:123@cluster0-shard-00-00.cmquq.mongodb.net:27017,cluster0-shard-00-01.cmquq.mongodb.net:27017,cluster0-shard-00-02.cmquq.mongodb.net:27017/tdb3?ssl=true&replicaSet=atlas-x8nl81-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(URL,connectionParams).then(()=>{
  console.log(`db connected`)})
.catch(()=>{
  console.log(`db not connected`)});

app.post('/register',async(res,req)=>{
  try{
  const{email,password,passwordCheck,displayName}=req.body;
    if(!email||!password){
      return res.status(400).json({msg:"please put a valid mail and adress"})
    }
    if(password.length<5){
      return res.status(400).json({msg:"password must be more than 5 chars"})
    }
    if(password!=passwordCheck){
      return res.status(400).json({msg:"password not correct"})
    }
    if(!displayName){
      displayName=email;
    }
    const existinguser=await Users.findOne({email:email});
    if(existinguser){
      return res.status(400).json({msg:"user is already regestered"})
    }
    const salt=await bcrypt.genSalt();
    const hashedPassword =await bcrypt.hash(password);
    const newUser=new Users({
      email:email,
      password:hashedPassword,
      displayName:displayName
    })
    const savedUser=await newUser.save();
    res.json(savedUser);
  }
    catch(error){
      return res.status(500).json({error:error.message})
    }
  })
  

app.post('/',async(req,res)=>{
  try{
  const {email,password}=req.body;
  if(!email||!password){
    return res.status(400).json({msg:"please put a valid mail and adress"})
  }
  if(!existinguser){
    return res.status(400).json({msg:"u r not reg"})
  }
  const isMatched = await bcrypt.compare(password,existinguser);
  if(!isMatched){
    return res.status(400).json({msg:"invalid cred"})
  }
  const toket =jwt.sign();
  const jwt_password=",BQhm#ARy{>;%p8yh`39h}/BpUG-9h";

}catch(error){
  return res.status(500).json({error:error.message})
}
})
app.delete('/',auth,(req,res)=>{
  try{

  }
  catch(error){
    return res.status(500).json({error:error.message});
}})
const auth =(req,res,next)=>{
  try{
    const token=req.header('x-auth-token');
    const jwt_password=",BQhm#ARy{>;%p8yh`39h}/BpUG-9h";
  }
  catch(error){
    return res.status(500).json({error:error.message});
}}

  // app.post('/',(req,res)=>{
  //   const member =new Members({
  //     name:req.body.name,
  //     age:req.body.age
  //   });
  //   member.save().then((data)=>{
  //     res.send(data);
  //   }).catch((error)=>{
  //     res.send(error)
  //   })})
  // app.get('/',async(req,res)=>{
  //   try{
  //   const fetchedMembers =await Members.find();
  //   res.send(fetchedMembers);}
  //   catch(error){
  //     res.json(error);

  //   }

  // });
  // app.delete('/:id',async(req,res)=>{
  //   try{
  //     const deletedMember = await Members.remove({_id:req.params.id});
  //     const memberAfterDeletion=await Members.find();
  //     res.json(memberAfterDeletion);
  //   }
  //   catch(error){
  //     res.json(error)
  //   }
  // })
  // module.exports=app;








 // const products =require('./products')
  //const router=require('./routes/api/products');
  //app.use(express.json());
  ///app.use(express.urlencoded({extended:false}));
  //app.use('/api/products',router);






//console.log(person.name);
//const path =require('path');
//const { Http2ServerRequest } = require('http2');
//console.log(path.dirname('/src/components/app.js'))

//const http=require('http');
//http.createServer((req,res)=>{
 //   res.write('no');
   // res.end();
//}).listen(1000,()=>console.log(("die")
//));


