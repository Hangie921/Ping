var express = require('express');
var router = express.Router();
var session = require('express-session');

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response;
var PingUser = pinglib.User;
var UserService = pinglib.UserService;
var SessionService = pinglib.SessionService;

var Profile = require('../module/schema/profile.js');

// router.get('/login', function(req, res, next) {

//     // @Todo 之後要在前端redirect
//     if (req.session.user !== undefined) {
//         return res.redirect('/dashboard');
//     }

//     var error = "";
//     var renderData = {
//         title: 'Ping'
//     };
//     if (req.session.error) {
//         renderData.error = req.session.error;
//         delete req.session.error;
//     }
//     res.render('pages/login', renderData);
// });


router.post('/api/login', function(req, res, next) {
    var acc = req.body.acc,
        pwd = req.body.pwd;

    var user = new PingUser();
    user.system_parameter = 1;
    user.name = acc;
    user.email = acc;
    user.pwd = pwd;

    var resJson = { code: 200 };
    // UserService.getUser(user, function(data) {
    SessionService.login(req, res, user, function(data) {

        if (data.code === 200) {
            if (data.values[0].custom !== undefined) {
                Profile.findById(data.values[0].custom._profile, function(err, profile) {
                    if (err) {
                        resJson.code = 500;
                        resJson.err = err;
                        return res.json(resJson);
                    }
                    data.values[0].custom._profile = profile;
                    // resJson.data = data.values[0];
                    resJson.data = profile;
                    req.session.user = data.values[0];
                    res.json(resJson);
                });
            } else
                res.json(resCode.No_Results);
        } else {
            resJson.code = 400;
            resJson.errmsg = 'Incorrect username or password';
            res.json(resJson);
        }
    });

});

module.exports = router;
