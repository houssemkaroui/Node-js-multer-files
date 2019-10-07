const express = require("express");
const route = express.Router();


route.get("/", (req,res,next)=>{

    //render the view
    res.render("main");
});


//export the module
module.exports = route;
