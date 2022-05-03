const express = require("express");
const CatSchema = require("../models/category.model");
const multer = require("multer");

const router = express.Router();

const filePath="assets/images/category"

// file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


const upload = multer({ storage }).single("picture");
// file upload end

// get all cats
router.get("/", (req, res) => {
    CatSchema.find({},(err,data)=>{
        if(err) return res.status(500).json({status:500,msg:"Something Wrong!"});
        if(!data) return res.status(200).json({status:200,msg:"No Data Found"})
        res.status(200).json({status:200,msg:data})
    })
});

// add new cat
router.post("/add", (req, res) => {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.status(500).json({status:500,msg:"Something Wrong In Uploading1!"})
        } else if (err) {
          // An unknown error occurred when uploading.
          res.status(500).json({status:500,msg:"Something Wrong In Uploading!"})
        }

        const {name,addedBy,description}=req.body;
    
        const picture=req.file.filename;
        let insCat=new CatSchema({name,description,picture,addedBy})

        insCat.save()
        .then(result=>{
            if(!result)
            return res.status(500).json({status:500,msg:"Something Wrong!"})

            if(result)
            res.status(200).json({status:200,msg:"Added"})
        })
        .catch(err=>{
            res.status(400).json({status:400,msg:"Something Wrong In Uploading!"})
        })


        // Everything went fine.
      })



});

module.exports = router;
