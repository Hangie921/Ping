var mongoose = require("mongoose"),
    Mixed = mongoose.Schema.Types.Mixed;

var options = { discriminatorKey: 'type' };

var Profile = mongoose.model('profile', new mongoose.Schema({
    time: { type: Date, default: Date.now },
    pic: { type: String, default: "img/alpaca2.jpg" },
}, options));

var CompanyProfile = Profile.discriminator('Company',
    new mongoose.Schema({
        username: { type: String, unique: true },
        description: { type: String, default: "尚未填寫簡介" },
        tagline: String,
        size: String,
        industry: String,
        establish_year: Number,
        location: {
            country: String,
            city: String
        },
        culture: Array,
        technology: Array,
        links: {
            official: String,
            facebook: String,
            linkedin: String,
            twitter: String,
            google: String,
        },
    }, options));

var TalentProfile = Profile.discriminator('Talent',
    new mongoose.Schema({
        username: { type: String, unique: true },
        phone: String,
        location: {
                country: String,
                city: String
            },
        skills: Array,
        personalities: Array,
        experiences: [{
            company: String,
            title: String,
            industry: String,
            start_date: Date,
            end_date: Date,
            location: {
                country: String,
                city: String
            }
        }],
        educations: [{
            degree: String,
            school: String,
            location: {
                country: String,
                city: String
            }
        }],
        awards: [{
            title: String,
            activity: String,
            date: Date,
            location: {
                country: String,
                city: String
            }
        }],
        agreements: [{
            title: String,
            agree: Boolean
        }],
        aspiration: {
            work_type: Array,
            salary: String,
            freelance_rate: {
                currency: String,
                amount: Number
            },
            relocate: Boolean
        },
        portfolio: [{
            pic: String,
            title: String
        }]
    }, options));

// @Todo http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
// @Todo http://mongoosejs.com/docs/guide.html#autoIndex

CompanyProfile.ensureIndexes(function(err) {
    if (err) console.error(err); // error occurred during index creation
});

module.exports = Profile;
module.exports.CompanyProfile = CompanyProfile;
module.exports.TalentProfile = TalentProfile;
