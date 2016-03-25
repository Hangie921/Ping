var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test1', function(req, res, next) {
	res.send({ test: 'test1' });
});

router.get('/test2', function(req, res, next) {
	res.send({ test: 'test2' });
});

module.exports = router;