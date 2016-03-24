//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var upload = require('multer')();

/* GET users listing. */

router.post('/',upload.array(), function(req, res, next) {
	// console.log("hi");
	console.log(req.body.mem_acc);
	console.log(req.body.mem_psw);


	res.redirect('/dashboard');
	
    
});



module.exports = router;