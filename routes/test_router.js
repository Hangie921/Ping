var express = require('express');
var fs = require('fs');
var router = express.Router();
var mailer = require('../module/utils/mailer.js');

var Position = require('../module/schema/position.js');
var Skill = require('../module/schema/skill.js');

/* GET home page. */
router.get('/test_angular', function(req, res, next) {
    res.render('pages/index', { layout: false });
});

function getJades(path) {
    return new Promise(function(resolve, reject) {

        fs.readdir(process.env.PWD + path, (err, data) => {
            if (err) reject(err);
            var pages = [];
            data.forEach(function(value, index) {
                if (value.endsWith('.jade')) {
                    pages.push(value.slice(0, -5));
                }
            });
            return resolve(pages);

        });
    });
}

router.get('/test', function(req, res, next) {

    var resJson = {};
    if (req.session.user) {
        resJson.user = req.session.user;
    } else {
        resJson.user = 'no session';
    }

    getJades('/views/pages').then(function(pages) {
            resJson.pages = pages;
            return getJades('/views/modules');
        })
        .then(function(modules) {
            resJson.modules = modules;
            res.render('pages/test', resJson);
        });
});

router.get('/positions', function(req, res, next) {
    Position.find(function(err, positions) {
        res.render('pages/positions', { positions: positions });
    });
});

router.get('/skills', function(req, res, next) {
    Skill.find(function(err, skills) {
        res.render('pages/skills', { skills: skills });
    });
});

router.get('/mail', function(req, res, next) {
    mailer.send("Rammus");
    res.send("send mail");
});



//added by Walter to build talent_profile
router.get('/pinger', function(req, res, next) {
    res.render('pages/pinger_profile');
});
//added by Walter to build talent_profile


module.exports = router;
