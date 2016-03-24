// load the config and return mongo object

var mongo= require('mongodb'),
	assert = require('assert'),
	instance = require('../SDK/instance');

function start(){
	return mongo;
}

function checkConnection(db){
	if(db){
		return db;
	}else{
		console.log("reconnect the Mongo");
		return instance.startMongo();
	}
}

exports.start = start;
exports.checkConnection = checkConnection;

