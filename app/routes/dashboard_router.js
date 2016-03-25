var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard', { user: req.session.user_acc });

});

router.get('/users', function(req, res, next) {
    console.log("/dashboard/users")
    user.findUsers(function(status, users) {
        res.render('users', { members: users });
        console.log("status ", status);

    });
});

module.exports = router;
