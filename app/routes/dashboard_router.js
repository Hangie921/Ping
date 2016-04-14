var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', {
        user: JSON.stringify(req.session.user)
    });
});

module.exports = router;
