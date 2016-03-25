var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.get('/users', function(req, res, next) {
    user.findUsers(function(status, users) {
        res.render('users', { users: users });
        console.log("status ", status);
    });
});

router.post('/user', function(req, res, next) {
    user.addDefaultCompany(function(status, users) {
        res.render('users', { users: users });
        console.log("status ", status);
    });
});
module.exports = router;
