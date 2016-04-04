var express = require('express');
var session = require('express-session');

var registered = function(_memberobj,callback){
	session.memberobj = _memberobj;
	callback(null,session.memberobj);
}

var sessionExist = function(session_key,callback){
	console.log("sessionExist ?"+session.memberobj);
	callback(null,session.memberobj!=null);
}

var cleanSession = function(session_key,callback){
	session.memberobj = null;
	callback(null,session.memberobj==null);
}


var memberService = require('../service/memberService');
var getMember = function(_memberobj,callback){
	memberService.getMember(_memberobj,function (err,data) {
		if (err) {return callback(err,null);}
		callback(null,data);
	});
}

module.exports.registered = registered;
module.exports.sessionExist = sessionExist;
module.exports.cleanSession = cleanSession;
module.exports.getMember = getMember;
