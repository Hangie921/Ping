var express = require('express');
var router = express.Router();
var Profile = require('../module/schema/profile.js');
var Contact = require('../module/schema/contact.js');

// API
router.all('/api/contact', function(req, res, next) {
    var resJson = { code: 200 };

    if (!req.session.user) {
        resJson.code = 401;
        resJson.errmsg = 'Unauthorized';
        return res.json(resJson);
    }
    console.log(req.body);
    if (Object.keys(req.body).length < 1) {
        resJson.code = 400;
        resJson.errmsg = 'Bad Request';
        return res.json(resJson);
    }

    try {
        console.log("my _id =", req.session.user.custom._profile._id);
        Contact.contact(req.session.user.custom._profile._id,
                req.body.contact_someone, req.body.msg)
            .then(function(msg) {
                console.log('msg', msg);
                res.json(resJson);
            })
            .catch(function(err) {
                console.log('err', err);
                resJson.code = 400;
                resJson.errmsg = err;
                res.json(resJson);
            });
    } catch (e) {
        console.log(__filename, e);
        resJson.code = 500;
        resJson.errmsg = e;
        return res.json(resJson);
    }

});

router.all('/api/contact/:profile', function(req, res, next) {
    Profile.findContactByUsername(req.params.profile)
        .then(function(doc) {
            res.json(doc);

        }).catch(function(err) {
        	console.log("ininin",err);
            next(new Error(err));
        });
});

module.exports = router;
