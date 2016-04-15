// express
var express = require('express');
var router = express.Router();

// module
var Company = require('../module/schema/company.js');

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;
var UserService = pinglib.UserService;

// varaiables
var routerName = 'companies';
var url = '/' + routerName;
var urlApi = '/api' + url;
router.get(url + '/:name', function(req, res) {
    console.log("msg", req.params.name);
    Company.find({ name: req.params.name }, function(err, company) {
        if (err) console.log(err);
        console.log(company);
        res.json(company);
    })
});

router.post(url + '/:name/edit', function(req, res) {

    Company.findOne({ name: req.params.name }, function(err, originCompany) {
        if (err) console.log(err);


        console.log("msg", req.params);
        for (key in req.params) {
            if(originCompany.key)
                originCompany.key = req.params.key;

        }
        // originCompany.culture = ["Sleepy"];
        console.log("originCompany", originCompany);
        Company.update({ _id: originCompany._id }, originCompany, function(err, status) {
            // if change
            // { ok: 1, nModified: 1, n: 1 }
            // if not change
            // { ok: 0, n: 0, nModified: 0 }
            console.log("company", status);
            res.json(status);

        })
    })
});

router.get(url, function(req, res) {
    Company.find(function(err, companies) {
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
        Company.findById(ret, function(err, company) {
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
