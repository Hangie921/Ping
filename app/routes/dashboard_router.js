var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var acc = "company",
        pwd = "company";
    user.findUser(acc, pwd, function(status, obj) {
        if (status) {
            res.render('dashboard', { member: req.session.user_acc });
        } else {
            res.render('dashboard', { member: req.session.user_acc });
            console.log("sth happened");
        }

    });


});

module.exports = router;
