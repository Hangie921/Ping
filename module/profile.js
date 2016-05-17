// Initialize
var async = require('async'),
    mongoose = require("mongoose");

// Test module
var Profile = require('./schema/profile.js');
var CompanyProfile = require('./schema/profile.js').CompanyProfile;
var TalentProfile = require('./schema/profile.js').TalentProfile;

// pinglib
var pinglib = require('pinglib');
var User = pinglib.User;

var main = {};

main.createUser = function(email, pwd, username, type) {
    return new Promise(function(resolve, reject) {
        var newProfile;
        if (type === 'Company') {
            newProfile = new CompanyProfile();
            newProfile.username = username;

        } else if (type === 'Talent') {
            newProfile = new TalentProfile();
            newProfile.username = username;

        } else {
            reject("Can't recognize type = " + type);
        }
        var newUser = new User();
        newUser.system_parameters = 1;
        newUser.email = email;
        newUser.pwd = pwd;
        newUser.custom = { _profile: newProfile._id };

        newProfile.save()
            .then(function(doc) {
// console.log("in")
                return newUser.save();
            })
            .then(function(doc) {
                resolve({ user: newUser, profile: newProfile });
            })
            .catch(function(reason) {
                Profile.findByIdAndRemove(newProfile)
                    .then(function(doc) {
                        reject(reason);
                    });
            });



    });
};

module.exports = main;
