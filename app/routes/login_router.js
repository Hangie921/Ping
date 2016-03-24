//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var mongo_handler = require("../module/mongo_handler.js");
var validate = require('../module/validate.js');
var upload = require('multer')();
var validate = require("../module/utils/validate.js");

/* GET users listing. */

router.post('/',upload.array(), function(req, res, next) {
	// console.log("hi");
	console.log(req.body.mem_acc);
	console.log(req.body.mem_psw);

	if(1 == 1){ // temp
		res.render('com_dashboard',{member:"company"});
	}else{
		res.render('com_dashboard',{member:"talent"});
	}
    
});



module.exports = router;