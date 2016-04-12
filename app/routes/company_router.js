var express = require('express');
var router = express.Router();
var Company = require('../module/company.js');
var mailer = require('../module/utils/mailer.js')

var routerName = 'companies';
var url = '/' + routerName;
var urlApi = '/api' + url;

router.get(url, function(req, res) {
    Company.find(function(err, companies) {
        if (err) console.log(err);
        res.render(routerName, { companies: companies });
    });
});

router.get(url + '/new', function(req, res) {
    res.render(routerName + '_new');
});

router.get(url + '/:id', function(req, res) {
    console.log(req.params.id);
    var returnString = `<button> <a href="${req.params.id}/edit">Edit <a></button>`;
    res.send(req.params.id + returnString);
});

//  @Feature: 可以放更改密碼或個人資料的東西
router.get(url + '/:id/edit', function(req, res) {
    res.send('<h1>Edit ' + req.params.id + '</h1><input type="text",name="mem_pwd" placeholder="Please enter your password here">' + '<br><button> Update </button>');
});

// @Feature送出資料後,做db操作
router.put(url + '/:id/edit', function(req, res) {
    console.log(`put #{req.params.id}/edit`);
});

router.post(url, function(req, res) {
    var acc = req.body.acc,
        pwd = req.body.pwd;

    var newCompany = new Company({ acc: acc, pwd: pwd });
    newCompany.save(function(err, user) {
        if (err) return console.error(err);
        mailer.send(acc, function(err, msg) {
            if (err) return console.error(err);
            console.log(msg);
        });
        res.redirect(routerName);

    });
});

router.put(url, function(req, res) {
    res.send("This is PUT");
});

router.delete(url, function(req, res) {
    res.send("This is Delete");
});

// APIs
router.get(urlApi, function(req, res) {
    Company.find(function(err, users) {
        if (err) console.log(err);
        res.json(users);
    });
});

router.post(urlApi, function(req, res) {
    var acc = req.body.acc,
        pwd = req.body.pwd;
    console.log(__filename, acc, pwd)
    if (acc == null || pwd == null) {
        console.log(__filename, "NULLL");
        res.status(400);
        res.json({ msg: "wrong form", data: null });
    } else {
        var newCompany = new Company({ acc: acc, pwd: pwd });
        newCompany.save(function(err, user) {
            if (err) return console.error(err);
            res.json({ msg: "succuss", data: user });
        });
    }
});

module.exports = router;
