var express = require('express');
var router = express.Router();
var mailer = require('../module/utils/mailer.js')

var Position = require('../module/schema/position.js');
var Skill = require('../module/schema/skill.js');

/* GET home page. */
router.get('/test1', function(req, res, next) {
    res.send({ test: 'test1' });
});

router.get('/test2', function(req, res, next) {
    res.send({ test: 'test2' });
});

router.get('/test', function(req, res, next) {
    var resJson = {};
    if (req.session.user) {
        resJson.user = req.session.user;
    } else {
        resJson.user = 'no session';
    }
    res.render('test', resJson);
});

router.get('/positions', function(req, res, next) {
    Position.find(function(err, positions) {
        res.render('positions', { positions: positions });
    });
});

router.get('/skills', function(req, res, next) {
    Skill.find(function(err, skills) {
        res.render('skills', { skills: skills });
    });
});

router.get('/mail', function(req, res, next) {
    mailer.send("Rammus");
    res.send("send mail");
});

module.exports = router;
