//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var upload = require('multer')();
var user = require('../module/user.js');
var session = require('express-session');

/* GET users listing. */

router.post('/login', upload.array(), function(req, res, next) {
    // console.log("hi");
    var acc = req.body.mem_acc,
        pwd = req.body.mem_pwd;
    user.find(acc, pwd, function(status, user) {
        if (status) {
            //  If login success, save session in req, and direct to /dashboard
            req.session.user_acc = user.acc;
            req.session.user_pwd = user.pwd;
            req.session.mem_type = user.mem_type
            res.redirect('/dashboard');
        } else {
            console.log("sth happened");
            res.redirect('/');
        }

    });

});



module.exports = router;
