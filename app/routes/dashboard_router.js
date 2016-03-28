var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', {
        user: req.session.user_acc,
        mem_type: req.session.mem_type
    });

});

module.exports = router;
