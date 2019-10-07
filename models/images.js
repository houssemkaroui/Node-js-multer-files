let mongoose = require("mongoose");

let imagesSchema = mongoose.Schema({
    filename :{
    	
            type : String,
    },
    num :{
    	type:Number
    }

});

let Image= module.exports= mongoose.model("Image", imagesSchema);
