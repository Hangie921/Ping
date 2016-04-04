var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var functionSchema = new Schema({
	_id:Schema.Types.ObjectId,
	system_parameter:{ type: Number, min: 0, max: 999 },
	name:String,
	function:Array
})

var bean_function = mongoose.model('function', functionSchema);

module.exports = bean_function;