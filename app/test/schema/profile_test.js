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
    it('try it', function(done) {
        return Promise.resolve(2 + 2).should.eventually.equal(5)
            .then(function(v) {
                console.log("ininin");
            });

        // done();
    });

    it.skip('duplate username will not save anything', function(done) {

        profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test', 'Company')
            .then(function(value, some) {
                console.log(value);
                // should.not.exist(value);
                // expect(value.user.email).to.equal('test@ping.com.sg2');
                // (value.user.email).should.be.equal('test@ping.com.sg2');
                return profileUtil.createUser('test@ping.com.sg', 'qwer1234', 'test2', 'Company');
            })
            .then(function(value) {
                console.log("in2");
            })
            .catch(function(err) {
                console.log("err", err);
                // should.exist(err);
                // should.not.exist(err);
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
});
