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

router.get('/test', function(req, res, next) {
    fs.readdir(process.env.PWD + '/views/pages', (err, data) => {
        if (err) console.log(err);
        var pages = [];
        data.forEach(function(value, index) {
            if (value.endsWith('.jade')) {
                pages.push(value.slice(0, -5));
            }
        });
        console.log(pages);

        var resJson = {};
        if (req.session.user) {
            resJson.user = req.session.user;
        } else {
            resJson.user = 'no session';
        }
        resJson.pages = pages;

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
