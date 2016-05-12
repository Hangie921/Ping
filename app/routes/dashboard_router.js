var express = require('express');
var router = express.Router();
var Profile = require('../module/schema/profile.js');

router.get('/dashboard', function(req, res, next) {
    if (req.session.user == null) {
        return res.redirect('login');
    }

    Profile.findById(req.session.user.custom._profile, function(err, data) {
        // console.log(data);
        if (data !== null) {
            req.session.user.custom._profile = data;
        }

        res.render('pages/dashboard', {
            user: req.session.user
        });
    })
});

// API
router.get('/api/dashboard', function(req, res, next) {
    if (req.session.user == null) {
        return res.json();
    }

    Profile.findById(req.session.user.custom._profile, function(err, data) {
        if (data !== null) {
            req.session.user.custom._profile = data;
        }

        res.json(req.session.user);
    })
});

module.exports = router;
