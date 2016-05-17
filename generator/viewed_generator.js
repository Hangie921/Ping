// node modules 
var mongoose = require("mongoose"),
    async = require('async'),
    dbURI = 'mongodb://localhost/ping';

mongoose.connect(dbURI);

// Models 
var Viewed = require('../module/schema/viewed.js');

var Profile = require('../module/schema/Profile.js');
var CompanyProfile = Profile.CompanyProfile;
var TalentProfile = Profile.TalentProfile;

var company, talent;
async.series({
        findCompany: function(callback) {
            CompanyProfile.findOne({ username: "Ping" })
                .exec(function(err, profile) {
                    company = profile;
                    callback(err, profile);
                });
        },
        findTalent: function(callback) {
            TalentProfile.findOne({ username: "Talent" })
                .exec(function(err, profile) {
                    talent = profile;
                    callback(err, profile);
                });
        },
        addViewed: function(callback) {
            company.viewSomeone(talent, function(err, data) {
                console.log(data);
                callback(err, data);
            });
        }
    },
    // 如果不放err, 會印不出所有results
    function(err, results) {
        if (err) console.log(err);
        // console.log(results);
        mongoose.disconnect();
    });
