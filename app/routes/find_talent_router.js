var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/find_talent', function(req, res, next) {
    res.render('find_talent_page', {user:req.session.user_acc ,item:"Talent" });
});


module.exports = router;
