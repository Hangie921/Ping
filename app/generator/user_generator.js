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

function newTalent(index) {

    var talentProfile = new TalentProfile({
        username: "Talent" + index,
        phone: "1234567890",
        location: {
            country: "TW",
            city: "Taipei"
        },
        positions: [{
            title: 'PM',
            year: 2,
            month: 3
        }, {
            title: 'Designer',
            year: 2,
            month: 3
        }],
        skills: ["photoshop", "illustrator", "sketch", "invision", "HTML"],
        personalities: ["I", "have", "passion", "but", "ugly"],
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
            salary: "Negotiable",
            freelance_rate: {
                currency: "NTD",
                amount: 1000
            }
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
        name: "talent" + index + "@ping.com.sg",
        email: "talent" + index + "@ping.com.sg",
        pwd: "qwer1234",
        custom: { _profile: talentProfile._id }
    });

    return new Promise(function(resolve, reject) {
        talent.save(function(err, doc) {
            if (err) reject(err);
            talentProfile.save(function(err, doc) {
                if (err) {
                    var rejectString = err;
                    User.findByIdAndRemove(talent._id, function(err, doc) {
                        reject(rejectString);
                    });
                }
                resolve({ talent: talent, talentProfile: talentProfile });

            });
        });
    });
}

function newCompany(index) {

    var companyProfile = new CompanyProfile({
        username: "Ping" + index,
        who_u_r: [{
            type: "Text",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam sed tempora impedit sapiente fuga voluptas, incidunt possimus excepturi, ipsam, eum esse temporibus animi, pariatur mollitia sunt a voluptate id quisquam?"
        }, {
            type: "List",
            content: ["hahahahah", "Walter hahahahahah", "Rammus hahaha"]
        }, {
            type: "Quote",
            content: "Walter hahahahahah Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, quis, vero? Quis nihil enim dicta magnam illum vitae labore ullam rem nulla cupiditate, excepturi iste provident, soluta itaque obcaecati optio!"
        }],
        what_u_do: [{
            type: "Text",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam sed tempora impedit sapiente fuga voluptas, incidunt possimus excepturi, ipsam, eum esse temporibus animi, pariatur mollitia sunt a voluptate id quisquam?"
        }, {
            type: "List",
            content: ["hahahahah", "Walter hahahahahah", "Rammus hahaha"]
        }, {
            type: "Quote",
            content: "Walter hahahahahah Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, quis, vero? Quis nihil enim dicta magnam illum vitae labore ullam rem nulla cupiditate, excepturi iste provident, soluta itaque obcaecati optio!"
        }],
        tagline: "ahaha is good",
        size: "1-10",
        industry: "Technolegy",
        establish_year: 2014,
        location: { country: "Taipei", city: "Taiwan" },
        culture: ["Fun in life", "HoHoHo", "Banana", "Kumamon"],
        technology: ["Pokemon", "Spy", "Beer", "Holiday", "Javascipt", "PHP"],
        links: { facebook: "www.facebook.com", google: "www.goole.com", official: "www.ping.com.sg" },
    });

    var company = new User({
        system_parameter: 1,
        name: "company" + index + "@ping.com.sg",
        email: "company" + index + "@ping.com.sg",
        pwd: "qwer1234",
        custom: { _profile: companyProfile._id }
    });

    return new Promise(function(resolve, reject) {
        company.save(function(err, doc) {
            if (err) reject(err);
            companyProfile.save(function(err, doc) {
                if (err) {
                    var rejectString = err;
                    User.findByIdAndRemove(company._id, function(err, doc) {
                        reject(rejectString);
                    });
                }
                resolve({ company: company, companyProfile: companyProfile });

            });
        });
    });
}

function dropDatabase() {
    return new Promise((resolve, reject) => {
        if (process.argv[2] === "--drop") {
            mongoose.connection.collections.users.remove(function(err) {
                if (err) reject(err);
                mongoose.connection.collections.profiles.remove(function(err) {
                    if (err) reject(err);
                    resolve(err);
                });
            });
        } else {
            resolve();
        }
    });
}

var requests = [dropDatabase()],
    USER_COUNTER = 10;

requests.push(newCompany(''));
requests.push(newTalent(''));
for (var i = 0; i < USER_COUNTER; i++) {
    requests.push(newCompany(i));
    requests.push(newTalent(i));
}

Promise.all(requests)
    .then(function(value) {
        mongoose.disconnect();
    })
    .catch(function(reason) {
        console.log(reason);
        mongoose.disconnect();
    });
