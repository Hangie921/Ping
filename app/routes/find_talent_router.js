var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('find_page', { user: req.session.user_acc });
});


module.exports = router;
