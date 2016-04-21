// Initialize
var request = require('supertest'),
    mongoose = require("mongoose"),
    mongodb = 'mongodb://localhost/test',
    should = require('chai').should(),
    async = require('async');

// Test module
var profile = require('../../module/schema/profile.js');
var CompanyProfile = require('../../module/schema/profile.js').CompanyProfile;

// pinglib
var pinglib = require('pinglib');
var User = pinglib.User;

beforeEach(function(done) {
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
});


after(function() {
    // afterEach(function(done) {
    mongoose.disconnect();
    // return done();
});


describe('CompanyProfile', function() {
    var newProfile = new CompanyProfile();
    newProfile.username = "ppp";

    var newUser = new User();
    newUser.system_parameters = 1;
    newUser.email = "123@ping.com.sg";
    newUser.pwd = "1234";
    newUser.custom = { _profile: newProfile._id };

    it.skip('shouldn\'t save same profile.username', function(done) {

        // same username with 'newProfile'
        var sameProfile = new CompanyProfile();
        sameProfile.username = "ppp";

        async.series({
                saveProfile: function(callback) {
                    newProfile.save(function(err, data) {
                        callback(err, data);
                    })
                },
                saveUser: function(callback) {
                    newUser.save(function(err, data) {
                        callback(err, data);
                    })
                },
                saveProfileTwice: function(callback) {
                    sameProfile.save(function(err, data) {
                        callback(err, data);
                    })
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
    })

    it('shouldn\'t rollback profile while newUser is error', function(done) {

        // same username with 'newProfile'
        var newProfileSecond = new CompanyProfile();
        newProfileSecond.username = "ooo";

        var newUserSecond = new User();
        newUserSecond.system_parameters = 1;
        newUserSecond.email = "123@ping.com.sg";
        newUserSecond.pwd = "1234";
        newUserSecond.custom = { _profile: newProfileSecond._id };

        async.series({
                saveProfile: function(callback) {
                    newProfile.save(function(err, data) {
                        callback(err, data);
                    })
                },
                saveUser: function(callback) {
                    newUser.save(function(err, data) {
                        callback(err, data);
                    })
                },
                saveProfileTwice: function(callback) {
                    newProfileSecond.save(function(err, data) {
                        callback(err, data);
                    })
                },
                saveUserTwice: function(callback) {
                    newUserSecond.save(function(err, data) {
                        should.exist(err);
                        if (err) {
                            CompanyProfile.findByIdAndRemove(newProfileSecond._id, function(err, removeProfile) {
                                (removeProfile.equals(newProfile)).should.be.false;
                                (removeProfile.equals(newProfileSecond)).should.be.true;
                                callback(err, data);
                            })
                        }
                    })
                },
            },
            // 如果不放err, 會印不出所有results
            function(err, results) {
                should.not.exist(err);
                should.not.exist(results.saveUserTwice);
                done();
            });
    })
});
