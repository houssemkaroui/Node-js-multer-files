const express = require("express");
const server = express();
const path = require("path");
const bodyParser= require("body-parser");
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());
const main = require("./routes/main");
const uploads = require("./routes/uploads");
server.use(express.static("./public"));
server.use(express.static("./uploads"));
server.use("/", main);
server.use("/", uploads);
server.listen(3000, ()=>{
    console.log("Server is running @ localhost:3000");
});



