// mongoose
var mongoose = require("mongoose"),
    Mixed = mongoose.Schema.Types.Mixed;

// ping-lib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;

// local module
var Contact = require('./contact.js');

// variables
var options = { discriminatorKey: 'type' };
var profileSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    pic: { type: String, default: "/img/alpaca2.jpg" },
    cover_pic: { type: String, default: "/img/profile_img/cover-photo.jpg" },
    footer_pic: { type: String, default: "/img/profile_img/cover-photo.jpg" }
}, options);


var companyProfileSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    who_u_r: [{
        type: { type: String, enum: ['Text', 'List', 'Quote'] },
        content: { type: Mixed, default: {} }
    }],
    what_u_do: [{
        type: { type: String, enum: ['Text', 'List', 'Quote'], default: "Text" },
        content: { type: Mixed, default: {} }

    }],
    tagline: { type: String, default: "" },
    size: {
        type: String,
        default: "",
        enum: ["",'1-10', '10-50', '50-100', '100+', '1000+']
    },
    industry: { type: String, default: "" },
    establish_year: { type: Number, default: "" },
    location: {
        country: { type: String, default: "" },
        city: { type: String, default: "" }
    },
    culture: [String],
    technology: [String],
    links: {
        official: { type: String, default: "" },
        facebook: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        twitter: { type: String, default: "" },
        google: { type: String, default: "" }
    }
}, options);

var talentProfileSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    description: { type: String, default: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit asperiores atque pariatur voluptatum alias culpa, maiores et dolores rerum cumque. Totam nisi aut repellendus dolores non dolore a optio distinctio." },
    phone: String,
    source_from: {
        type: String,
        default: 'official',
        enum: ['official', '104', 'ntuea-2016-summer', 'friends']
    },
    positions: [{
        _id: false,
        title: String,
        seniority: Number,
    }],
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
        end_date: { type: Date, default: Date.now },
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
        end_date: { type: Date, default: Date.now },
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
    portfolios: [{
        _id: false,
        pic: String,
        title: String,
        tag: [String],
        last_modified: Date
    }]
}, options);


profileSchema.methods.viewSomeone = function(who, cb) {
    return Contact.findById(this._id, (err, contact) => {
        if (err) cb(err);
        if (contact === null) {
            contact = new Contact();
            contact._id = this._id;

        }
        contact.view.push({ _id: who });
        contact.save((err, someone) => {
            if (err) cb(err);
            who.viewedBy(this, function(err, doc) {
                cb(err, { iView: someone, someoneViewBy: doc });
            });
        });
    });
};

profileSchema.methods.viewedBy = function(who, cb) {
    return Contact.findById(this._id, (err, doc) => {
        if (err) cb(err);
        if (doc === null) {
            doc = new Contact();
            doc._id = this._id;
        }
        doc.viewed_by.push({ _id: who });
        doc.save(function(err, doc) {
            cb(err, doc);
        });
    });
};

profileSchema.statics.findByUsername = function(username) {
    return new Promise((resolve, reject) => {
        this.findOne({ username: username }, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        });
    });
};

var Skill = require('./skill.js');


profileSchema.statics.findContactByUsername = function(username) {
    return new Promise((resolve, reject) => {
        this.findOne({ username: username }).exec()
            .then((doc) => {
                if (!doc) reject("Can't find username:" + username);
                return this.db.model('contact').findByIdAndUpdate(doc, { _id: doc }, { new: true, upsert: true }).exec();
            })
            .then((doc) => {
                resolve(doc);
            })
            .catch(function(err) {
                reject(err);
            });
    });
};

// profileSchema.pre('save', function(next) {
//     var doc = this;

profileSchema.post('update', function(doc, next) {
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

// var Contact = require('./contact.js');

profileSchema.methods.findContact = function(callback) {
    return this.db.model('contact').findByIdAndUpdate(this, { _id: this }, { new: true, upsert: true }, callback);
};

profileSchema.post('save', (doc, next) => {
    //  initail 新的用戶時，要新增一筆 contact
    doc.findContact(function(err, doc) {
        if (err) console.log(err);
        next();
    });
});

// profileSchema.save(function(err) {
//     console.log(err);
// });

// profileSchema.post('save', function(doc, next) {
//     next();
// });

// profileSchema.methods.updatePosition = function(position, cb) {
//     return Contact.findById(this._id, (err, doc) => {
//         if (err) cb(err);
//         if (doc == null) {
//             doc = new Contact();
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
