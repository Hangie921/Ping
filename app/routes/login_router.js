var express = require('express');
var router = express.Router();
var upload = require('multer')();
var session = require('express-session');

// pinglib
var pinglib = require('pinglib');
var PingUser = pinglib.User;
var UserService = pinglib.UserService;
var SessionService = pinglib.SessionService;

var Profile = require('../module/schema/profile.js');

router.get('/login', function(req, res, next) {
    var error = "";
    var renderData = {
        title: 'Ping'
    }
    if (req.session.error) {
        renderData.error = req.session.error;
        delete req.session.error;
    }
    res.render('login', renderData);
});


router.post('/login', upload.single(), function(req, res, next) {
    var acc = req.body.mem_acc,
        pwd = req.body.mem_pwd;

    var user = new PingUser();
    user.system_parameter = 1;
    user.name = acc;
    user.email = acc;
    user.pwd = pwd;

    var resJson = { code: 200 };
    // console.log("user= ", user);
        // console.log("s1",req.session.user)
        // UserService.getUser(user, function(data) {
    SessionService.login(req, res, user, function(data) {

        // console.log(__filename,data);
        // console.log(__filename,data.values);
        // console.log(__filename,data.values[0].custom);
        if (data.code === 200) {
            console.log("123")
            if (data.values[0].custom !== undefined) {
                console.log("456")
                Profile.findById(data.values[0].custom._profile, function(err, profile) {
                    if (err) {
                        console.log("789")
                        resJson.code = 404;
                        return res.json(resJson);
                    }
                    console.log("10101");
                    console.log(profile);
                    data.values[0].custom._profile = profile;
                    resJson.data = data.values[0];
                    req.session.user = data.values[0];
                    res.json(resJson);
                    // @Temp : 暫時redirect, 之後改ajax, res.json(...)
                    // res.redirect('dashboard');
                })
            }
        } else {
            req.session.error = 'Incorrect username or password';
            resJson.code = 404;
            res.json(resJson);
            console.log(__filename,resJson);
            console.log("error");
                // @Temp : 暫時show error, 之後改ajax, res.json(...)
                // res.redirect('/');
        }
    });

});

module.exports = router;
