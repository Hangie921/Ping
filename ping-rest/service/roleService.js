//--DEFINE---
var roleobj = require('../bean/role');


//--PUBLIC FUNCTION---
var getRole = function(_roleobj,callback){
	roleobj.find({ 
		// _id:_roleobj._id,
		system_parameter:_roleobj.system_parameter,
	}, function(err, _roleobj) {
	  if (err) {
	  	// Call callback function with error
    	return callback(err);
	  }
	  console.log("Role findOne="+_roleobj);
	  callback(null,_roleobj);
	});
}


//--EXPORT---
exports.getMember = getMember;