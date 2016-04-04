//--DEFINE---
var memberobj = require('../bean/member');


//--PUBLIC FUNCTION---
var getMember = function(_memberobj,callback){
	memberobj.find({
    	// _id: mongoose.Types.ObjectId,
    	// _id: mongoose.Types.ObjectId,
		system_parameter:_memberobj.system_parameter,
		email : _memberobj.email,
		pwd: _memberobj.pwd
	}, function(err, _memberobj) {
	  if (err) {
	  	// Call callback function with error
    	return callback(err);
	  }
	  console.log("findOne="+_memberobj);
	  callback(null,_memberobj);
	});
}


//--EXPORT---
exports.getMember = getMember;