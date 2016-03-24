var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var acc="company",
	psw="company";
	user.findUser(acc,psw);
    res.render('dashboard', { member: "company" });
});

module.exports = router;
