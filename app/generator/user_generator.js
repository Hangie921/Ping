// node modules 
var mongoose = require("mongoose"),
    async = require('async'),
    dbURI = 'mongodb://localhost/ping';

mongoose.connect(dbURI);


// Models 
var profile = require('../module/schema/profile.js');
var CompanyProfile = require('../module/schema/profile.js').CompanyProfile;
var TalentProfile = require('../module/schema/profile.js').TalentProfile;

// pinglib
var pinglib = require('pinglib');
var User = pinglib.User;

var companyProfile = new CompanyProfile({
    username: "Ping",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore inventore impedit beatae ex repellat veritatis blanditiis harum cumque ullam ab qui, alias ipsum quia ut, odit rerum dolorum animi voluptatibus.",
    tagline: "ahaha is good",
    size: "10-25",
    industry: "Technolegy",
    establish_year: 2014,
    location: { country: "Taipei", city: "Taiwan" },
    culture: ["Fun in life", "HoHoHo", "Banana", "Kumamon"],
    technology: ["Pokemon", "Spy", "Beer", "Holiday", "Javascipt", "PHP"],
    links: { facebook: "www.facebook.com", google: "www.goole.com", official: "www.ping.com.sg" },
});
var company = new User({
    system_parameter: 1,
    name: "company@ping.com.sg",
    email: "company@ping.com.sg",
    pwd: "qwer1234",
    custom: { _profile: companyProfile._id }
});

var talentProfile = new TalentProfile({
    username: "Talent",
    phone: "1234567890",
    location: {
        country: "TW",
        city: "Taipei"
    },
    skills: ["photoshop", "illustrator", "sketch", "invision", "HTML"],
    personalities: ["I", "have", "passionate", "but", "ugly"],
    experiences: [{
        company: "Ping",
        title: "RD",
        industry: "startup",
        start_date: new Date(),
        end_date: new Date(),
        location: {
            country: "TW",
            city: "Taipei"
        }
    }],
    educations: [{
        degree: "Master",
        school: "National Taiwan University",
        location: {
            country: "TW",
            city: "Taipei"
        }
    }],
    awards: [{
        title: "Best of Next",
        activity: "Melbourne Internation Animation Festival",
        date: new Date(),
        location: {
            country: "TW",
            city: "Taipei"
        }
    }],
    agreements: [{
        title: "permission",
        agree: true
    }],
    aspiration: {
        work_type: ["Android", "IOS"],
        salary: "Negotiable",
        freelance_rate: {
            currency: "NTD",
            amount: 1000
        },
        relocate: true
    },
    portfolio: [{
        pic: "img/alpaca.jpg",
        title: "Alpaca"
    }, {
        pic: "img/alpaca.jpg",
        title: "Alpaca"
    }, {
        pic: "img/alpaca.jpg",
        title: "Alpaca"
    }, {
        pic: "img/alpaca.jpg",
        title: "Alpaca"
    }]
});
var talent = new User({
    system_parameter: 1,
    name: "talent@ping.com.sg",
    email: "talent@ping.com.sg",
    pwd: "qwer1234",
    custom: { _profile: talentProfile._id }
});

async.series({
        dropDatabase: function(callback) {
            if (process.argv[2] === "--drop") {
                for (var i in mongoose.connection.collections) {
                    mongoose.connection.collections[i].remove(function() {});
                }
            }
            callback();
        },
        companyProfile: function(callback) {
            companyProfile.save(function(err, data) {
                callback(err, data);
            })
        },
        company: function(callback) {
            company.save(function(err, data) {
                callback(err, data);
            })
        },
        talentProfile: function(callback) {
            talentProfile.save(function(err, data) {
                callback(err, data);
            })
        },
        talent: function(callback) {
            talent.save(function(err, data) {
                callback(err, data);
            })
        },
    },
    // 如果不放err, 會印不出所有results
    function(err, results) {
        if (err) console.log(err);
        console.log(results);
        mongoose.disconnect();
    });
