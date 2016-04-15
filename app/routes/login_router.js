var express = require('express');
var router = express.Router();
var upload = require('multer')();
var User = require('../module/user.js');
var session = require('express-session');

// pinglib
var pinglib = require('pinglib');
var PingUser = pinglib.User;
var UserService = pinglib.UserService;
var SessionService = pinglib.SessionService;

router.get('/login', function(req, res, next) {
    console.log(__filename,req.session.user);
    var error = "";
    var renderData = {
        title: 'Ping'
    }
    if (req.session.error) {
        renderData.error = req.session.error;
        delete req.session.error;
    }
    console.log(renderData)
    res.render('login', renderData);
});


router.post('/login', upload.single(), function(req, res, next) {

    var acc = req.body.mem_acc,
        pwd = req.body.mem_pwd;
    console.log(req.body);

    var user = new PingUser();
    user.system_parameter = 1;
    user.name = acc;
    user.email = acc;
    user.pwd = pwd;
    // console.log("user= ", user);

    // console.log("s1",req.session.user)
    // UserService.getUser(user, function(data) {
    SessionService.login(req, res, user, function(data) {
        console.log(__filename,data);
        console.log(__filename,data.values);
        console.log(__filename,data.values[0].custom);
        if (data.code === 200) {

            // @Temp : 暫時redirect, 之後改ajax, res.json(...)
            // res.redirect('dashboard');
            req.session.user = data.values[0];

            res.json("hello");
        } else {
            req.session.error = 'Incorrect username or password';
            // @Temp : 暫時show error, 之後改ajax, res.json(...)
            res.redirect('/');
        }
    });

});

module.exports = router;
