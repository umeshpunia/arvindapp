const express = require("express");
const CatSchema = require("../models/category.model");
const ProSchema=require('../models/product.model')
const router = express.Router();


// get all cats
router.get("/category", (req, res) => {
    CatSchema.find({},(err,data)=>{
        if(err) return res.status(500).json({status:500,msg:"Something Wrong!"});
        if(!data) return res.status(200).json({status:200,msg:"No Data Found"})
        res.status(200).json({status:200,msg:data})
    })
});


// get single cat
router.get("/category/:_id", (req, res) => {
    const {_id}=req.params;
    CatSchema.findOne({_id},(err,data)=>{
        if(err) return res.status(500).json({status:500,msg:"Something Wrong!"});
        if(!data) return res.status(200).json({status:200,msg:"No Data Found"})
        res.status(200).json({status:200,msg:data})
    })
});


// fetch products via cat id
router.get("/products/:categoryid", (req, res) => {
    const {categoryid}=req.params;
    ProSchema.find({category:categoryid},(err,data)=>{
        if(err) return res.status(500).json({status:500,msg:"Something Wrong!"});
        if(!data) return res.status(200).json({status:200,msg:"No Data Found"})
        res.status(200).json({status:200,msg:data})
    })
});

// fetch single product
router.get("/product/:_id", (req, res) => {
    const {_id}=req.params;
    ProSchema.findOne({_id},(err,data)=>{
        if(err) return res.status(500).json({status:500,msg:"Something Wrong!"});
        if(!data) return res.status(200).json({status:200,msg:"No Data Found"})
        res.status(200).json({status:200,msg:data})
    })
});



module.exports = router;
