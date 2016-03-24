//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(1 == 1){ // temp
		res.render('com_dashboard',{member:"company"});
	}else{
		res.render('com_dashboard',{member:"talent"});
	}
    
});

module.exports = router;