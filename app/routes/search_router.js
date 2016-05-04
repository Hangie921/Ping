// express
var express = require('express');
var router = express.Router();

// module
var Profile = require('../module/schema/profile.js');
var TalentProfile = Profile.TalentProfile;

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response;

// varaiables
var routerName = 'search';
var url = '/' + routerName;
var urlApi = '/api' + url;

// @Todo 之後看是不是要放在更外層
// @Todo '/*' should change to '*'
router.get(url + '/*', function(req, res, next) {
    console.log(__filename, url + " middle");
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
});

router.get(url, function(req, res, next) {
    res.send("This is search page, need use res.render()");
});

router.get(urlApi, function(req, res, next) {
    var resJson = resCode.OK;
    var condition = {};

    if (req.query.position) {
        condition.pinger_type = req.query.position;
        if (req.query.seniority && req.query.seniority > 0)
            condition.positions = { $elemMatch: { title: req.query.position, seniority: { $gte: req.query.seniority } } };

    } else {
        if (req.query.seniority && req.query.seniority > 0)
            condition.positions = { $elemMatch: { seniority: { $gte: req.query.seniority } } };
    }

    if (req.query.work_type) {
        condition["aspiration.work_type"] = req.query.work_type;
    }

    console.log(__filename, JSON.stringify(condition));

    if (Object.keys(condition).length === 0) {
        res.json(resCode.Bad_Request);
    } else {
        TalentProfile.find(condition)
            .select({
                _id: 0,
                username: 1,
                pic: 1,
                location: 1,
                skills: 1,
                pinger_type: 1,
                description: 1,
                "aspiration.work_type": 1
            })
            .exec(function(err, docs) {
                resJson.data = docs;
                res.json(resJson);
            });

    }
});


module.exports = router;
