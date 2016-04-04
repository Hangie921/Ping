//--DEFINE---
var functionobj = require('../bean/function');


//--PUBLIC FUNCTION---
var fun_getFunction = function(obj,callback){
	functionobj.find({ 
		// _id:_roleobj._id,
		system_parameter:obj.system_parameter,
	}, function(err, obj) {
	  if (err) {
	  	// Call callback function with error
    	return callback(err);
	  }
	  console.log("Function findOne="+obj);
	  callback(null,obj);
	});
}


//--EXPORT---
exports.getFunction = fun_getFunction;