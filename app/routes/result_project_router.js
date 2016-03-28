var express = require('express');
var router = express.Router();
var user = require('../module/user.js');

/* GET home page. */
router.all('/project_result', function(req, res, next) {
    res.render('result_project_page', {user:req.session.user_acc,item:'Talent'});
});


module.exports = router;
