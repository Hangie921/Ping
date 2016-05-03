// mongoose
var mongoose = require("mongoose"),
    Mixed = mongoose.Schema.Types.Mixed;

// ping-lib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;

// local module
var Viewed = require('./viewed.js');

// variables
var options = { discriminatorKey: 'type' };

var profileSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    pic: { type: String, default: "img/alpaca2.jpg" },
}, options);


var companyProfileSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    who_u_r: [{
        type: { type: String, enum: ['Text', 'List', 'Quote'] },
        content: Mixed
    }],
    what_u_do: [{
        type: { type: String, enum: ['Text', 'List', 'Quote'] },
        content: Mixed
    }],
    tagline: String,
    size: {
        type: String,
        default: '1-10',
        enum: ['1-10', '10-50', '50-100', '100+', '1000+']
    },
    industry: String,
    establish_year: Number,
    location: {
        country: String,
        city: String
    },
    culture: [String],
    technology: [String],
    links: {
        official: String,
        facebook: String,
        linkedin: String,
        twitter: String,
        google: String,
    },
}, options);

var talentProfileSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    phone: String,
    source_from: {
        type: String,
        default: 'official',
        enum: ['official', '104', 'ntuea-2016-summer', 'friends']
    },
    pinger_type: {
        type: String,
        default: 'Designer',
        enum: ['Designer', 'Developer', 'PM']
    },
    location: {
        country: String,
        city: String
    },
    skills: [{
        type: String,
        lowercase: true
    }],
    personalities: [String],
    experiences: [{
        _id: false,
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
        _id: false,
        degree: String,
        school: String,
        start_date: Date,
        end_date: Date,
        location: {
            country: String,
            city: String
        }
    }],
    awards: [{
        _id: false,
        title: String,
        activity: String,
        date: Date,
        location: {
            country: String,
            city: String
        }
    }],
    agreements: [{
        _id: false,
        title: String,
        agree: Boolean
    }],
    aspiration: {
        work_type: {
            type: String,
            default: 'Freelance',
            enum: ['Full-Time', 'Freelance', 'Secondment']
        },
        salary: String,
        freelance_rate: {
            currency: String,
            amount: Number
        },
        relocate: { type: Boolean, default: false }
    },
    portfolio: [{
        _id: false,
        pic: String,
        title: String,
        tag: [String],
        last_modified: Date
    }]
}, options);

profileSchema.methods.viewSomeone = function(who, cb) {
    return Viewed.findById(this._id, (err, viewed) => {
        if (err) cb(err);
        if (viewed === null) {
            viewed = new Viewed();
            viewed._id = this._id;

        }
        viewed.view.push({ _id: who });
        viewed.save((err, someone) => {
            if (err) cb(err);
            who.viewedBy(this, function(err, doc) {
                cb(err, { iView: someone, someoneViewBy: doc });
            });
        });
    });
};

profileSchema.methods.viewedBy = function(who, cb) {
    return Viewed.findById(this._id, (err, doc) => {
        if (err) cb(err);
        if (doc === null) {
            doc = new Viewed();
            doc._id = this._id;
        }
        doc.viewed_by.push({ _id: who });
        doc.save(function(err, doc) {
            cb(err, doc);
        });
    });
};

var Skill = require('./skill.js');

// profileSchema.pre('save', function(next) {
//     var doc = this;

profileSchema.post('save', function(doc, next) {
    // Update collection('skills')
    if (doc.skills) {
        var requests = doc.skills.map((value) => {
            return new Promise((resolve, reject) => {
                Skill.tagBy(value, doc._id, (err, doc) => {
                    if (err) reject(err);
                    resolve(doc);
                });
            });
        });

        Promise.all(requests).then((docs) => {
            // console.log(docs);
            next();
        }, (reason) => {
            next(new Error(reason));
        });
    } else {
        next();
    }
});


// profileSchema.post('save', function(doc, next) {
//     console.log("hi");
//     next();
// });

// profileSchema.save(function(err) {
//     console.log(err);
// });

// profileSchema.post('save', function(doc, next) {
//     next();
// });

// profileSchema.methods.updatePosition = function(position, cb) {
//     return Viewed.findById(this._id, (err, doc) => {
//         if (err) cb(err);
//         if (doc == null) {
//             doc = new Viewed();
//             doc._id = this._id;
//         }
//         doc.viewed_by.push({ _id: who });
//         doc.save(function(err, doc) {
//             cb(err, doc);
//         });
//     });
// }

// @Todo http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
// @Todo http://mongoosejs.com/docs/guide.html#autoIndex

var Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;
module.exports.CompanyProfile = Profile.discriminator('Company', companyProfileSchema);
module.exports.TalentProfile = Profile.discriminator('Talent', talentProfileSchema);
