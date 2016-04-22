// node modules
var express = require('express'),
    router = express.Router(),
    async = require('async');

// module
// var User = require('../module/user.js');
var Profile = require('../module/schema/profile.js');
var CompanyProfile = require('../module/schema/profile.js').CompanyProfile;
var TalentProfile = require('../module/schema/profile.js').TalentProfile;
var mailer = require('../module/utils/mailer.js')

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;
var UserService = pinglib.UserService;

// varaiables
var routerName = 'users';
var url = '/' + routerName;
var urlApi = '/api' + url;

router.get(url, function(req, res, next) {
    PingUser
        .find()
        .exec(function(err, users) {
            if (err) return next(err);
            res.render(routerName, { users: users });
        });
});

// @Useless
router.get(url + '/new', function(req, res) {
    res.render(routerName + '_new');
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
                })
            },
            saveUser: function(cb) {
                newPingUser.save(function(err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                        console.log(err);
                        CompanyProfile.findByIdAndRemove(profile._id, function(errRemoveProfile, removeProfile) {
                            cb(err, data);
                        })

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

    // UserService.registered(newPingUser, function(resStatus) {

    //     //  add user succuss > add profile
    //     if (resStatus.code === resCode.OK) {

    //         profile.save(function(err, company) {
    //             console.log(__filename,
    //                 "err=" + err, company);

    //             //  add profile fail > delete user
    //             mailer.send(acc, function(err, msg) {
    //                 if (err) return console.error(err);
    //                 console.log(msg);
    //             });
    //             callback();
    //         });
    //     } else {
    //         callback(resStatus);
    //     }
    // });

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
    PingUser
        .find()
        .exec(function(err, users) {
            if (err) {
                return next(new Error('PingUser.find()'));
            }

            // Prepare promises
            var requests = users.map((user, index) => {
                return new Promise((resolve) => {
                    if (user.custom !== undefined) {
                        var id = user.custom['_profile'];
                    }

                    if (id !== undefined) {
                        Profile
                            .findById(id)
                            .exec(function(err, doc) {
                                // if (err) {}
                                users[index].custom._profile = doc;
                                resolve("index");
                            })
                    } else {
                        // reject("errrrr");
                        resolve();
                    }
                });
            })

            // Run promises
            Promise.all(requests).then((reason) => {
                console.log("im done");
                console.log(reason);
                res.json(users);
            }, () => {
                // return next(new Error('PingUser.find()'));
                console.log(reason);
                res.json(reason);
            });

        });
});

router.post(urlApi, function(req, res) {
    var acc = req.body.acc,
        pwd = req.body.pwd;
    console.log(__filename, acc, pwd)
    if (acc == null || pwd == null) {
        console.log(__filename, "NULLL");
        res.status(400);
        res.json({ msg: "wrong form", data: null });
    } else {
        var newPingUser = new User({ acc: acc, pwd: pwd });
        newUser.save(function(err, user) {
            if (err) return console.error(err);
            res.json({ msg: "succuss", data: user });
        });
    }
});

module.exports = router;
