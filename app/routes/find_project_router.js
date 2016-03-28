var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/find_project', function(req, res, next) {
	res.send('not found find_page');
    // res.render('find_project_page', {user:req.session.user_acc ,item:"Talent" });
});


module.exports = router;
