// load the config and return the express.app object
var express = require('express').Router(),
	app = express();


function start(){  
	return app;
}

exports.start = start;
