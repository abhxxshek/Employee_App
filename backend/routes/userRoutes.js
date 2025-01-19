const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const userModel=require('../model/userData');
const jwt=require('jsonwebtoken');

router.post('/login',async(req,res)=>{
    const user=await userModel.findOne({email:req.body.email});  //the first email is the email in the database and the second email is the email in the input field in the login page
    if(!user){
        res.status(404).send({message:'User not found !'});
    }
    try{
        if(user.password==req.body.password){
           const payload={email:user.email,password:user.password,role:user.role};
           const token=jwt.sign(payload,'employeeApp');
            res.status(200).send({message:'Login successful',token:token})//the first token can be given any name ,but the second token is the token declared in the above step
        }
        else{
            res.status(400).send({message:'Invalid credentials'})
        }
    }catch(error){
        console.log(error);
    }
})


router.post('/adduser',async(req,res)=>{
    try{
        const item=req.body;
        const data=new userModel(item);
        await data.save();
        res.send({message:"User registration successful"})
    }
    catch(error){
        res.send({message:"User registration failed !"});
    }
})


module.exports=router