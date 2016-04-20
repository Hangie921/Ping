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
    console.log(__filename, "msg", req.params.name);
    CompanyProfile.findOne({ name: req.params.name }, function(err, company) {
        if (err) return next(err);
        console.log(__filename, req.session.user);
        res.render('company_profile', {
            user: req.session.user,
            company: company
        });
    })
});

router.get(url + '/:name/edit', function(req, res) {
    res.render("company_profile_edit", {
        user: req.session.user
    });
});


router.post(url + '/:name/edit', function(req, res) {

    CompanyProfile.findOne({ name: req.params.name }, function(err, originCompany) {
        if (err) console.log(err);


        console.log("msg", req.body);
        for (key in req.body) {
            if (originCompany[key])
                originCompany[key] = req.body[key];

        }
        // originCompany.culture = ["Sleepy"];
        console.log("originCompany", originCompany);
        CompanyProfile.update({ _id: originCompany._id }, originCompany, function(err, status) {
            // if change
            // { ok: 1, nModified: 1, n: 1 }
            // if not change
            // { ok: 0, n: 0, nModified: 0 }
            // get data but not change
            // { ok: 1, nModified: 0, n: 1 }
            console.log("company", status);
            res.json(status);

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
