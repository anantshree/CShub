var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost:27017/stackoverflow', function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('connected to mongodb');
	}
});

var Schema = mongoose.Schema;

// create a schema
var schema = new Schema({

   name : { type: String, required: true},
   mobile: { type: Number, required: true}
});

module.exports = mongoose.model('data', schema);