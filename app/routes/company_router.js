// express
var express = require('express');
var router = express.Router();

// module
var CompanyProfile = require('../module/schema/profile.js').CompanyProfile;

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;
var UserService = pinglib.UserService;

// varaiables
var routerName = 'companies';
var url = '/' + routerName;
var urlApi = '/api' + url;

router.get(url + '/:name', function(req, res, next) {

    // user router's name to find a User , and find his company
    PingUser.findOne({ name: req.params.name })
        .exec(function(err, user) {
            if (err) {
                next(new Error('CompanyProfile.findOne()'));

            } else if (user == null) {
                res.render('error', {
                    message: 'Can\'t find this user',
                    error: {}
                });

            } else {

                CompanyProfile.findById(user.custom._profile)
                    .exec(function(err, company) {
                        // res.json(company);
                        res.render('company_profile', {
                            user: req.session.user,
                            company: company
                        });
                    });
            }
        })
});

router.get(url + '/:name/edit', function(req, res) {
    var section = req.query.section;
    if (section === "detail") {
        res.render("company_profile_edit", {
            user: req.session.user
        });

    } else if (section === "social") {
        res.render("company_profile_edit", {
            user: req.session.user
        });

    } else {
        res.render("company_profile_edit", {
            user: req.session.user
        });
    }
});

router.post(url + '/:name/edit', function(req, res) {
    console.log(req.get('Content-Type'));
    var resJson = { code: 200, data: {} };
    CompanyProfile.findOne({ username: req.session.user.custom._profile.username }, function(err, originCompany) {
        if (err) next(new Error('CompanyProfile.findOne()'));

        // update from req.body
        for (key in req.body) {
            if (originCompany[key])
                originCompany[key] = req.body[key];
        }

        CompanyProfile.update({ _id: originCompany._id }, originCompany, function(err, status) {
            if (err) next(new Error('CompanyProfile.update()'));
            // if change
            // { ok: 1, nModified: 1, n: 1 }
            // if not change
            // { ok: 0, n: 0, nModified: 0 }
            // get data but not change
            // { ok: 1, nModified: 0, n: 1 }
            resJson.data.company = status;
            req.session.user.custom._profile = originCompany;
            res.json(resJson);

        })
    })
});

router.get(url, function(req, res) {
    CompanyProfile.find(function(err, companies) {
        res.render('companies', { companies: companies });
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
        var ret = data.values[0].custom._company;
        // res.json(ret);
        CompanyProfile.findById(ret, function(err, company) {
            res.json(company);
        })
    });

    PingUser.find(function(err, users) {
        if (err) console.log(err);
        // console.log(users);
        // res.render(routerName, { users: users });
    });
});

module.exports = router;
