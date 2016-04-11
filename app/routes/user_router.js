var express = require('express');
var router = express.Router();
var User = require('../module/user.js');
var mailer = require('../module/utils/mailer.js')

router.get('/users', function(req, res) {
    User.find(function(err, users) {
        if (err) console.log(err);
        res.render('users', { users: users });
    });
});

router.get('/api/users', function(req, res) {
    User.find(function(err, users) {
        if (err) console.log(err);
        res.json(users);
    });
});

router.get('/users/new', function(req, res) {
    res.render('users_new');
});

router.get('/users/:id', function(req, res) {
    console.log(req.params.id);
    var returnString = `<button> <a href="${req.params.id}/edit">Edit <a></button>`;
    res.send(req.params.id + returnString);
});

//  @Feature: 可以放更改密碼或個人資料的東西
router.get('/users/:id/edit', function(req, res) {
    res.send('<h1>Edit ' + req.params.id + '</h1><input type="text",name="mem_pwd" placeholder="Please enter your password here">' + '<br><button> Update </button>');
});

// @Feature送出資料後,做db操作
router.put('/users/:id/edit', function(req, res) {
    console.log(`put #{req.params.id}/edit`);
});

router.post('/users', function(req, res) {
    var acc = req.body.acc,
        pwd = req.body.pwd;

    var newUser = new User({ acc: acc, pwd: pwd });
    newUser.save(function(err, user) {
        if (err) return console.error(err);
        mailer.send(acc, function(err, msg) {
            if (err) return console.error(err);
            console.log(msg);
            res.redirect('users');
        });

    });
});

router.put('/users', function(req, res) {
    res.send("This is PUT");
});

router.delete('/users', function(req, res) {
    res.send("This is Delete");
});

module.exports = router;
