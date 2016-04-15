var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
	console.log(__filename,req.session.user);
    res.render('dashboard', {
        user: req.session.user
    });
});

module.exports = router;
