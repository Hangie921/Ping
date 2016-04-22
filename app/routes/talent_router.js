// express
var express = require('express');
var router = express.Router();

// module
var TalentProfile = require('../module/schema/profile.js').TalentProfile;

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;
var UserService = pinglib.UserService;

// varaiables
var routerName = 'talents';
var url = '/' + routerName;
var urlApi = '/api' + url;

// @Todo 之後看是不是要放在更外層
router.get(url + '/*', function(req, res, next) {
    console.log(__filename, url + " middle");
    if (req.session.user == undefined) {
        return res.redirect('/login');
    }
    next();
});

router.get(url + '/:username', function(req, res) {
    console.log("msg", req.params.username);
    TalentProfile.findOne({ username: req.params.username }, function(err, talent) {
        if (err) console.log(err);
        console.log(talent);
        res.json(talent);
    })
});

router.post(url + '/:username/edit', function(req, res) {

    TalentProfile.findOne({ username: req.params.username }, function(err, originCompany) {
        if (err) console.log(err);


        console.log("msg", req.body);
        for (key in req.body) {
            if(originCompany[key])
                originCompany[key] = req.body[key];

        }
        // originCompany.culture = ["Sleepy"];
        console.log("originCompany", originCompany);
        TalentProfile.update({ _id: originCompany._id }, originCompany, function(err, status) {
            // if change
            // { ok: 1, nModified: 1, n: 1 }
            // if not change
            // { ok: 0, n: 0, nModified: 0 }
            // get data but not change
            // { ok: 1, nModified: 0, n: 1 }
            console.log("talent", status);
            res.json(status);

        })
    })
});

router.get(url, function(req, res) {
    TalentProfile.find(function(err, talents) {
        res.render('talents', { talents: talents });
    })
});

router.get(urlApi, function(req, res) {
    var acc = req.query.acc;
    var pwd = req.query.pwd;
    var user = new PingUser();
    user.system_parameter = 1;
    user.name = acc;
    user.email = acc;
    user.pwd = pwd;

    // Test Case
    UserService.getUser(user, function(data) {
        var ret = data.values[0].custom._talent;
        // res.json(ret);
        TalentProfile.findById(ret, function(err, talent) {
            res.json(talent);
        })
    });

    PingUser.find(function(err, users) {
        if (err) console.log(err);
        // console.log(users);
        // res.render(routerName, { users: users });
    });
});

module.exports = router;
