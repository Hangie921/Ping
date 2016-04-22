var mongoose = require("mongoose"),
    Mixed = mongoose.Schema.Types.Mixed;

var options = { discriminatorKey: 'type' };

var Profile = mongoose.model('profile', new mongoose.Schema({
    time: { type: String, default: new Date() },
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
        location: String,
        culture: Array,
        technology: Array,
        links: Mixed,
    }, options));

var TalentProfile = Profile.discriminator('Talent',
    new mongoose.Schema({
        religion: String,
        username: { type: String, unique: true },
    }, options));

// username: String "unique"
// name: String
// pic: String
// phone: String
// position: String
// skill: Array
// agreement: Mixed
// education_info: Mixed
// talent_info: Mixed
// work_experience: Mixed
// award: Mixed

// @Todo http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
// @Todo http://mongoosejs.com/docs/guide.html#autoIndex

CompanyProfile.ensureIndexes(function(err) {
    if (err) console.error(err); // error occurred during index creation
});

module.exports = Profile;
module.exports.CompanyProfile = CompanyProfile;
module.exports.TalentProfile = TalentProfile;
