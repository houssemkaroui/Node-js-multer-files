const path= require("path");

const multer= require("multer");


let storage = multer.diskStorage({
    destination: function (req, files, cb) {
      cb(null, './houssem/')
    },
    filename: function (req, files, cb) {
      cb(null, files.originalname)
    }
  })

const upload= multer({storage: storage}).array('image',10);

module.exports= upload;

