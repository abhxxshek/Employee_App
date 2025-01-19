const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const empModel=require('../model/empData');
const jwt=require('jsonwebtoken');


function verifyToken(req,res,next){
        let token=req.headers.token;
        try{
            if(!token) throw 'Unauthorized access !'
            else{
                let payload=jwt.verify(token,'employeeApp');
                if(!payload) throw 'Unauthorized access !';
                next();
            }
        }catch(error){
            console.log(error);
        }
}

router.get('/',async(req,res)=>{
    try{
        const data=await empModel.find();
        res.send(data);
    }catch(error){
        res.send({message:"Data not found !"});
    }

})

router.post('/add-emp',verifyToken,async(req,res)=>{
    try{
        const emp=req.body;
    const data=new empModel(emp);
    await data.save();
    res.send({message:"Employee registration successful"})
    }catch(error){
        res.send({message:"Employee registration failed !"})
    }
})

router.put('/update-emp/:id',verifyToken,async(req,res)=>{
    try{
        const data=await empModel.findByIdAndUpdate(req.params.id,req.body);
        res.send({message:"Employee update successful"});
    }catch(error){
        res.send({message:"Employee update failed !"})
    }
})

router.delete('/delete-emp/:id',verifyToken,async(req,res)=>{
    try{
        const data=await empModel.findByIdAndDelete(req.params.id);
        res.send({message:"Employee deleted successfully"});
    }catch(error){
        res.send({message:"Employee delete unsuccessful"})
    }
})



module.exports=router