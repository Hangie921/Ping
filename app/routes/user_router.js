var express = require('express');
var router = express.Router();
var upload = require('multer')();
var user = require('../module/user.js');

/* GET home page. */
router.get('/users', function(req, res) {
    user.show(function(status, users) {
        res.render('users', { users: users });
        console.log("status ", status);
    });
});
// router.param('id', function(req, res, next, value) {
// 	console.log(value);
// 	next();
// });

router.get('/user/:id', function (req, res) {
	console.log(req.params.id);
	res.send(req.params.id);
})

router.post('/user', function(req, res) {
    var acc = req.body.acc,
        pwd = req.body.pwd;

    console.log(acc, pwd);
    res.send(acc + pwd);
    user.create(acc, pwd, function(status, users) {
        res.render('users', { users: users });
        console.log("status ", status);
    });
});

router.delete('/user', function(req, res) {
	user.destroy();
	res.send("This is Delete");
});
module.exports = router;
