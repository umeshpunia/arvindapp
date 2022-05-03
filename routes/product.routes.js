const express = require("express");
const proSchema = require("../models/product.model");
const multer = require("multer");
const router = express.Router();
const filePath = "assets/images/product";

//file upload

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

//file upload end

//get all pro
router.get("/", (req, res) => {
  proSchema.find({}, (err, data) => {
    if (err)
      return res.status(500).json({ status: 500, msg: "something wrong" });
    if (!data)
      return res.status(200).json({ status: 200, msg: "no data found" });
    res.status(200).json({ status: 200, msg: data });
  });
});

//add new pro

router.post("/add", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .json({ status: 500, msg: "something wrong in uploading1" });
    } else if (err) {
      // An unknown error occurred when uploading.
      res
        .status(500)
        .json({ status: 500, msg: "something wrong in uploading" });
    }
    const { name, description, addedBy, category, price } = req.body;

    const picture = req.file.filename;
    let insPro = new proSchema({
      name,
      description,
      picture,
      addedBy,
      category,
      price,
    });

    insPro
      .save()
      .then((result) => {
        if (!result)
          return res.status(500).json({ status: 500, msg: "something wrong" });
        if (result) res.status(200).json({ status: 200, msg: "Added" });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ status: 400, msg: "something wrong in uploading" });
      });
    // Everything went fine.
  });
});

module.exports = router;
