var mongoose = require("mongoose");

var personeSchema = mongoose.Schema({
nom: {
	type:String
}

});

var Persone= module.exports= mongoose.model("Persone", personeSchema);
