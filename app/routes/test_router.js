var express = require('express');
var router = express.Router();
var mailer = require('../module/utils/mailer.js')

/* GET home page. */
router.get('/test1', function(req, res, next) {
	res.send({ test: 'test1' });
});

router.get('/test2', function(req, res, next) {
	res.send({ test: 'test2' });
});

router.get('/test', function(req, res, next) {
	res.render('test');
});

router.get('/mail', function(req, res, next) {
	mailer.send("Rammus");
	res.send("send mail");
});

module.exports = router;