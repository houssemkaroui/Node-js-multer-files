const express = require("express");
const route = express.Router();
const fs = require("fs"); 
const path = require("path");
const mongoose = require("mongoose");
const upload = require("../multer/storage");
const Persone = require('../models/persone');
const Image = require("../models/images");
var mkdirp = require('mkdirp');

mongoose.connect('mongodb://localhost/images', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});
route.get("/uploads/:id", (req, res, next)=>{
   Image.find({_id:req.params.id}, (err, doc)=>{
       if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Offre :' + JSON.stringify(err, undefined, 2)); }
   });  
});
route.get("/uploads", (req, res, next)=>{
   Image.find({}, (err, doc)=>{
       if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Offre :' + JSON.stringify(err, undefined, 2)); }
   }); 
});
route.get("/houssem", (req,res ) =>{
  Image.count({}).then((count,err) =>{
    res.status(201).json({
      message:"succ",
      nombrefile:count
    });
  });
});
route.get('/count', function(req,res){
  Image.count({num:"2"}).then((count,err)=>{
    console.log(count)
    res.status(200).json({
      message:"le nombre et ",
      nombre:count
    });
  });
});
route.post('/persone',(req,res) =>{
  var per = new Persone({
    nom: req.body.nom
  });
  per.save().then(create =>{
    res.status(200).json({
      message:"les files sont save with succ"
    })
  })
})
route.delete('/dele', async(req,res) =>{
  var tablenom = []
  json = req.body
  console.log(json)
  for (var i =0; i< json['idPersone'].length;i++){
    console.log(json['idPersone'].length)
    var salim = new Persone()
    salim = await Persone.find({_id:json['idPersone'][i]})
         tablenom.push(salim[0]['nom'])
         console.log(salim[0]['nom'])
  }
  Persone.remove(({_id:{'$in':json['idPersone']}})).then(resulta =>{
    res.status(200).json({
      message:"dele"
    })
  })
})
route.post("/uploads", (req, res, next)=>{
    mkdirp('houssem', function(err,message) { 
          if(err){console.log(err)}
            else{
              message:"folder houssem create"
            }
         });
    upload(req, res, function (err) {
            for(var i = 0; i < req.files.length; i++){
                  let image = new Image({
                    filename:req.files[i].originalname,
                    num:req.body.num,
                  })
                    image.save().then(create =>{
                        res.status(200).json({
                               message: "files save avec suc",
                        });
                        
                    });
            }
    }); 
});
//delete with body multi files
route.delete('/deletefil', async(req,res) =>{
  json = req.body
  for (var i =0; i< json['idPersone'].length;i++){
    var salim = new Image()
    salim = await Image.find({_id:json['idPersone'][i]}).exec()
          var a =salim[0]['filename']
         console.log(a)
           const directory ='houssem'
      const path = directory+'/'+a
           fs.unlink(path, (err) => {
             if (err) {
              console.log(err);
            return
          }
          });
  }
  Image.remove(({_id:{'$in':json['idPersone']}})).then(resulta =>{
    res.status(200).json({
      message:"les files sont sup"
    })
  })
})

route.get('/download/:filename',(req, res) => {
  var filename = req.params.filename;
  image = new Image({
    image:req.file.filename
  })
  console.log(image)
  image.download(); 
});

module.exports = route;




  

