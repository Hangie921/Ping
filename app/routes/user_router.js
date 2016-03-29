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

router.get('/user/:id', function(req, res) {
    console.log(req.params.id);
    var returnString = `<button> <a href="${req.params.id}/edit">Edit <a></button>`;
    res.send(req.params.id + returnString);
});

//  @Feature: 可以放更改密碼或個人資料的東西
router.get('/user/:id/edit', function(req, res) {
    res.send('<h1>Edit ' + req.params.id + '</h1><input type="text",name="mem_pwd" placeholder="Please enter your password here">' + '<br><button> Update </button>');
});

// @Feature送出資料後,做db操作
router.put('/user/:id/edit', function(req, res) {
	console.log(`put #{req.params.id}/edit`);
});

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

router.put('/user', function(req, res) {
    user.update();
    res.send("This is PUT");
});
module.exports = router;
