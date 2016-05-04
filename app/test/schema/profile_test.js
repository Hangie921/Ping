// Initialize
var request = require('supertest'),
    mongoose = require("mongoose"),
    mongodb = 'mongodb://localhost/test',
    should = require('chai').should(),
    expect = require('chai').expect,
    assert = require('chai').assert,
    async = require('async');

// Test module
var Profile = require('../../module/schema/profile.js');
var CompanyProfile = require('../../module/schema/profile.js').CompanyProfile;

var profileUtil = require('../../module/profile.js');

// pinglib
var pinglib = require('pinglib');
var User = pinglib.User;

var mongoSetup = function mongoSetup(done) {
    function clearDB() {
        if (true) {
            for (var i in mongoose.connection.collections) {
                mongoose.connection.collections[i].remove(function() {});
            }
        }
        return done();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(mongodb, function(err) {
            if (err) throw err;
            return clearDB();
        });
    } else {
        return clearDB();
    }
};

describe('CompanyProfile', function() {
    beforeEach(mongoSetup);

    afterEach(function() {
        mongoose.disconnect();
    });
    it.skip('GGGGGGGG', function(done) {
        var request = [
            profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test', 'Company'),
        ];

        Promise.all(request)
            .then(function(value) {
                console.log(value);
                done();
            })
            .catch(function(reason) {
                console.log(reason);
                done();
            });
    });

    it('duplate username will not save anything', function(done) {

        var a = profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test', 'Company')
            .then(function(value) {
                console.log(value);
                console.log(value.user.email);
                // expect(value.user.email).to.equal('test@ping.com.sg2');
                // (value.user.email).should.be.equal('test@ping.com.sg2');
                return profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test2', 'Company');
            })
            .then(function(value) {
                console.log("in2");
            }, function(err) {
                console.log(err);
                done();
            });
            // a.should.be.null;

        // .catch(function(err) {
        //     // should.not.exist(err);
        //     console.log("err", err);
        //     expect(423).equal(42);
        //     // expect(err).be.an('object2').to.throw("hi");
        // });


    });

    it.skip('shouldn\'t save same profile.username', function(done) {


        var newProfile = new CompanyProfile();
        newProfile.username = "ppp";

        var newUser = new User();
        newUser.system_parameters = 1;
        newUser.email = "123@ping.com.sg";
        newUser.pwd = "1234";
        newUser.custom = { _profile: newProfile._id };
        // same username with 'newProfile'
        var sameProfile = new CompanyProfile();
        sameProfile.username = "ppp";

        async.series({
                saveProfile: function(callback) {
                    newProfile.save(function(err, data) {
                        callback(err, data);
                    });
                },
                saveUser: function(callback) {
                    newUser.save(function(err, data) {
                        callback(err, data);
                    });
                },
                saveProfileTwice: function(callback) {
                    sameProfile.save(function(err, data) {
                        callback(err, data);
                    });
                }
            },
            // 如果不放err, 會印不出所有results
            function(err, results) {
                if (err) {
                    console.log("err", err);
                }
                console.log(results);
                done();
            });
    });

    it.skip('shouldn\'t rollback profile while newUser is error', function(done) {

        // same username with 'newProfile'
        var newProfileSecond = new CompanyProfile();
        newProfileSecond.username = "ooo";

        var newUserSecond = new User();
        newUserSecond.system_parameters = 1;
        newUserSecond.email = "123@ping.com.sg";
        newUserSecond.pwd = "1234";
        newUserSecond.custom = { _profile: newProfileSecond._id };

        var createUser = function(email, pwd, username) {
            return new Promise(function(resolve, reject) {

                var newProfile = new CompanyProfile();
                newProfile.username = username;

                var newUser = new User();
                newUser.system_parameters = 1;
                newUser.email = email;
                newUser.pwd = pwd;
                newUser.custom = { _profile: newProfile._id };

                newProfile.save()
                    .then(function(doc) {

                        console.log('doc1', doc);
                        return newUser.save();
                    })
                    .then(function(doc) {
                        console.log('doc2', doc);
                        resolve(doc);
                    })
                    .catch(function(reason) {
                        console.log("reject");
                        reject(reason);
                    });
            });
        };
        var request = [
            createUser('test@ping.com.sg', 'qwer1234', 'test'),
        ];

        Promise.all(request)
            .then(function(value) {
                console.log(value);
                done();
            })
            .catch(function(reason) {
                console.log(reason);
            });
    });
});
