// express
var express = require('express');
var router = express.Router();

// module
var Profile = require('../module/schema/profile.js');
var TalentProfile = Profile.TalentProfile;

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response;


router.get('/api/search', function(req, res, next) {
    var resJson = { code: 200 };
    var condition = {};
    var LIMIT = 16;

    var page = req.query.page - 1 || 0;
    console.log('page=', page);

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
        var selection = {
            _id: 0,
            username: 1,
            pic: 1,
            location: 1,
            skills: 1,
            pinger_type: 1,
            description: 1,
            "aspiration.work_type": 1
        };
        var queryTalent = TalentProfile.find(condition).select(selection).skip(page * LIMIT).limit(LIMIT).exec();
        var queryTalentCount = TalentProfile.find(condition).select(selection).count().exec();
        return queryTalent
            .then(function(docs) {
                resJson.data = docs;
                return queryTalentCount;
            })
            .then(function(count) {
                resJson.count = count;
                return res.json(resJson);
            })
            .catch(function(err) {
                return res.json({ code: 500, errmsg: err });
            });

    }
});


module.exports = router;
