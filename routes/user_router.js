// node modules
var express = require('express'),
    router = express.Router(),
    async = require('async');

// module
// var User = require('../module/user.js');
var Profile = require('../module/schema/profile.js');
var CompanyProfile = require('../module/schema/profile.js').CompanyProfile;
var TalentProfile = require('../module/schema/profile.js').TalentProfile;
var mailer = require('../module/utils/mailer.js');

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;

// varaiables
var routerName = 'users';
var url = '/' + routerName;
var urlApi = '/api' + url;

router.get(url, function(req, res, next) {
    PingUser
        .find()
        .exec(function(err, users) {
            if (err) return next(err);
            res.render('pages/' + routerName, { users: users });
        });
});

// @Useless
router.get(url + '/new', function(req, res) {
    res.render('pages/' + routerName + '_new');
});

// @Useless
router.get(url + '/:id', function(req, res) {
    console.log(req.params.id);
    var returnString = `<button> <a href="${req.params.id}/edit">Edit <a></button>`;
    res.send(req.params.id + returnString);
});

// @Useless 可以放更改密碼或個人資料的東西
router.get(url + '/:id/edit', function(req, res) {
    res.send('<h1>Edit ' + req.params.id + '</h1><input type="text",name="mem_pwd" placeholder="Please enter your password here">' + '<br><button> Update </button>');
});

// @Useless 送出資料後,做db操作
router.put(url + '/:id/edit', function(req, res) {
    console.log(`put #{req.params.id}/edit`);
});

// Example: 
//   createUser(acc, pwd, username, type, function(err) {});
//
function createUser(acc, pwd, username, type, callback) {
    var newPingUser = new PingUser();
    newPingUser.system_parameter = 1;
    newPingUser.name = acc;
    newPingUser.email = acc;
    newPingUser.pwd = pwd;
    var profile;

    if (type === "company") {
        profile = new CompanyProfile();
        profile.username = username;
        newPingUser.custom = { _profile: profile._id };

    } else if (type === "talent") {
        profile = new TalentProfile();
        profile.username = username;
        newPingUser.custom = { _profile: profile._id };
    }

    async.series({
            saveProfile: function(cb) {
                profile.save(function(err, data) {
                    cb(err, data);
                });
            },
            saveUser: function(cb) {
                newPingUser.save(function(err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                        console.log(err);
                        CompanyProfile.findByIdAndRemove(profile._id, function(errRemoveProfile, removeProfile) {
                            cb(err, data);
                        });

                    } else {
                        cb(err, data);
                    }
                });
            }
        },
        // 如果不放err, 會印不出所有results
        function(err, results) {
            if (err) {
                return callback(err);
            }

            callback(null, results);
            mailer.send(acc, function(err, msg) {
                // @Todo Write it in logger
                if (err) return console.error(err);
                console.log(msg);
            });
        });
}

router.post(url, function(req, res, next) {
    var acc = req.body.acc,
        pwd = req.body.pwd,
        username = req.body.username,
        type = req.body.member_type;

    var resJson = { code: 200 };

    createUser(acc, pwd, username, type, function(err, msg) {

        if (err) {
            resJson.code = 400;
            resJson.errmsg = err;
        }

        resJson.msg = msg;
        res.json(resJson);
    });

});

// @Useless
router.put(url, function(req, res) {
    res.send("This is PUT");
});

// @Useless
router.delete(url, function(req, res) {
    res.send("This is Delete");
});

/////////////////////////////
// APIs
/////////////////////////////
router.get(urlApi, function(req, res, next) {

    PingUser.find(function(err, users) {
        var opts = [{
            path: 'custom._profile',
            model: 'profile'
        }];

        var promise = PingUser.populate(users, opts);

        promise.then(function(results) {
            res.json(results);
        }, function(reason) {
            res.json(reason);
        });
    });

});


module.exports = router;
