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

router.post('/api/session/check', function(req, res) {
    if (req.session.user) {
        return res.json({ code: 200, msg: 'OK' });
    } else {
        return res.json({ code: 401, errmsg: "no session.user" });
    }
});

/* GET users listing. */
router.post('/api/logout', function(req, res) {
    var resJson = { code: 200 };
    try {
        req.session.destroy(function() {
            req.session = null;
            res.clearCookie('connect.sid', { "path": '/' });
            res.redirect("/");
            resJson.msg = 'logout success';
            res.json(resJson);
        });

    } catch (e) {
        resJson.code = 500;
        resJson.errmsg = e;
        res.json(resJson);
    }
});


router.post('/api/login', function(req, res) {
    var acc = req.body.acc,
        pwd = req.body.pwd;

    var user = new PingUser();
    user.system_parameter = 1;
    user.name = acc;
    user.email = acc;
    user.pwd = pwd;

    // UserService.getUser(user, function(data) {
    SessionService.login(req, res, user, function(data) {

        if (data.code === 200) {
            if (data.values[0].custom !== undefined) {
                Profile.findById(data.values[0].custom._profile, function(err, profile) {
                    if (err) {
                        return res.json({ code: 500, errmsg: 'Profile.findById' });
                    }
                    data.values[0].custom._profile = profile;
                    req.session.user = data.values[0];
                    return res.json({ code: 200, data: profile });
                });
            } else
                return res.json({ code: 603, errmsg: 'No Results' });
        } else {
            return res.json({ code: 400, errmsg: 'Incorrect username or password' });
        }
    });

});

module.exports = router;
