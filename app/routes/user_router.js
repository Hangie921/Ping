// express
var express = require('express');
var router = express.Router();

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

router.get(url, function(req, res) {
    PingUser.find(function(err, users) {
        if (err) console.log(err);
        res.render(routerName, { users: users });
    });
});

router.get(url + '/new', function(req, res) {
    res.render(routerName + '_new');
});

router.get(url + '/:id', function(req, res) {
    console.log(req.params.id);
    var returnString = `<button> <a href="${req.params.id}/edit">Edit <a></button>`;
    res.send(req.params.id + returnString);
});

//  @Feature: 可以放更改密碼或個人資料的東西
router.get(url + '/:id/edit', function(req, res) {
    res.send('<h1>Edit ' + req.params.id + '</h1><input type="text",name="mem_pwd" placeholder="Please enter your password here">' + '<br><button> Update </button>');
});

// @Feature送出資料後,做db操作
router.put(url + '/:id/edit', function(req, res) {
    console.log(`put #{req.params.id}/edit`);
});

function createUser(acc, pwd, type, callback) {
    var newPingUser = new PingUser();
    newPingUser.system_parameter = 1;
    newPingUser.name = acc;
    newPingUser.email = acc;
    newPingUser.pwd = pwd;
    var profile;


    if (type === "company") {
        profile = new CompanyProfile();
        profile.name = acc;
        newPingUser.custom = { _profile: profile._id };

    } else if (type === "talent") {
        profile = new TalentProfile();
        profile.name = acc;
        // companyOrTelent.description = "Nice Company";
        // companyOrTelent.location = "TW";
        // companyOrTelent.culture = "Fun in life";
        newPingUser.custom = { _profile: profile._id };
    }

    // var errors = newPingUser.validateSync();
    // console.log("error",error.errors['system_parameter'].message);
    UserService.registered(newPingUser, function(resStatus) {
        if (resStatus.code === resCode.OK) {
            console.log(__filename, "profile.save()");
            profile.save(function(err, company) {
                console.log(__filename, company);
                mailer.send(acc, function(err, msg) {
                    if (err) return console.error(err);
                    console.log(msg);
                });
                callback();
            });
        } else {
            callback(resStatus);
        }
    });

}

router.post(url, function(req, res) {
    var acc = req.body.acc,
        pwd = req.body.pwd,
        type = req.body.member_type;

    createUser(acc, pwd, type, function(err) {
        if (err)
            console.log("createUserAndCompany", err);
        res.redirect('/test');
    });

});

router.put(url, function(req, res) {
    res.send("This is PUT");
});

router.delete(url, function(req, res) {
    res.send("This is Delete");
});

/////////////////////////////
// APIs
/////////////////////////////
router.get(urlApi, function(req, res) {
    // PingUser.find(function(err, users) {
    //     console.log(users);
    //     if (err) console.log(err);
    //     res.json(users);
    // });
    PingUser
        .find()
        .exec(function(err, users) {
            if (err) {
                console.err(err);
                return res.json(err);
            }

            var requests = users.map((user, index) => {
                return new Promise((resolve) => {
                    if (user.custom !== undefined) {
                        console.log(`idx[${index}]=` + index);
                        var id = user.custom['_profile'];
                    }

                    if (id !== undefined) {
                        Profile
                            .findById(id)
                            .exec(function(err, doc) {
                                // console.log(doc);
                                users[index].custom._profile = doc;
                                console.log(`idx[${index}]=` + users[index]);
                                resolve();
                            })
                    } else {
                        resolve();
                    }
                });
            })

            Promise.all(requests).then(() => {
                console.log("im done");
                res.json(users);
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
