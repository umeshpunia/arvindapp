const express=require('express');
const bcrypt=require('bcrypt');
const UserSchema=require('../models/user.model');

const router=express.Router();




// add user
router.post('/add',(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password) return res.status(400).json({status:400,msg:"Please Fill Fields"})


    bcrypt.hash(password,12,(err,hashPass)=>{
        if(err) return res.status(500).json({status:500,msg:"Something Wrong,Please Try Again!"})
        if(!hashPass) return res.status(501).json({status:501,msg:"Something Wrong"})

        // insert into db
        let insUser=new UserSchema({email,password:hashPass});

        insUser.save().then(result=>{
            if(!result) return res.status(400).json({status:400,msg:"Please Try Again"})
            res.status(200).json({status:200,msg:"Added Successfully"})
        }).catch(error=>{
            res.status(401).json({status:401,msg:"Please Fill Fields"})
        })
    })

})


// login
router.post('/login',(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password) return res.status(400).json({status:400,msg:"Please Fill Fields"})


    UserSchema.findOne({email},(err,data)=>{
        if(err) return res.status(400).json({status:400,msg:err.message})
        if(!data) return res.status(500).json({status:500,msg:"Something Wrong"})


        // user found
        if(data.status=="Active"){
            bcrypt.compare(password,data.password,(err,isValid)=>{
                if(err) return res.status(501).json({status:501,msg:err.message});
                if(!isValid) return res.status(403).json({status:403,msg:"Wrong Credientials!"})
                res.status(200).json({status:200,msg:{email}})
            })

        }else{
            res.status(403).json({status:403,msg:"User Blocked"})

        }

    })

    
})

// get all users
router.get('/',(req,res)=>{
    UserSchema.find({},(err,data)=>{
        if(err) return res.status(500).json({status:500,msg:"Something Wrong"});
        if(!data) return res.status(400).json({status:400,msg:"Something Wrong"})
        res.status(200).json({status:200,msg:data})
    })
})








module.exports=router;