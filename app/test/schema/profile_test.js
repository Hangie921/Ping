// Initialize
var request = require('supertest'),
    mongoose = require("mongoose"),
    mongodb = 'mongodb://localhost/test',
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    assert = chai.assert,
    async = require('async');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

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

    describe.skip('done case', function() {
        it('duplate username will not save anything', function() {

            return profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test', 'Company')
                .then(function(value, some) {
                    should.exist(value);
                    return profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test2', 'Company');
                })
                .then(function(value) {
                    should.not.exist(value);
                }, function(err) {
                    (err.message).should.include('E11000 duplicate key error collection: test.users index: system_parameter_1_email_1 dup');
                })
                .catch(function(err) {
                    console.log("err", err);
                    should.not.exist(err);
                });
        });
    });

    it('findByUsername', function() {
        var profile;
        return profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test', 'Company')
            .then(function(value) {
                should.exist(value);
                profile = value.profile;
                return Profile.findByUsername('test');
            })
            .then(function(value) {
                should.exist(value);
                (value._id).should.deep.equal(profile._id);
            })
            .catch(function(err) {
                console.log("err", err);
                should.not.exist(err);
            });


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
});
