//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	req.session.destroy(function(){
		req.session = null;
		res.clearCookie('connect.sid',{"path":'/'});
		res.redirect("/");
	});
    
});

module.exports = router;