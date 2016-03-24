var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var acc="company",
	pwd="company";
	user.findUser(acc,pwd);
    res.render('dashboard', { member: "company" });
});

module.exports = router;
